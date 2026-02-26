import { redisClient } from "../config/redis.js";

/**
 * Generic caching middleware for API responses
 * @param {number} duration - Cache duration in seconds
 */
export const cacheMiddleware = (duration = 300) => {
  return async (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    // Create cache key from URL and query params
    const cacheKey = `cache:${req.originalUrl || req.url}`;

    try {
      // Check if data exists in cache
      const cachedData = await redisClient.get(cacheKey);
      
      if (cachedData) {
        console.log(`⚡ Cache HIT for: ${cacheKey}`);
        return res.json(JSON.parse(cachedData));
      }

      console.log(`💾 Cache MISS for: ${cacheKey}`);

      // Store original res.json to intercept response
      const originalJson = res.json.bind(res);
      
      // Override res.json to cache the response
      res.json = (data) => {
        // Cache the response
        redisClient.set(cacheKey, JSON.stringify(data), { EX: duration })
          .then(() => console.log(`✅ Cached: ${cacheKey} for ${duration}s`))
          .catch(err => console.error('Redis cache error:', err));
        
        // Send the response
        return originalJson(data);
      };

      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      next(); // Continue even if caching fails
    }
  };
};

/**
 * Clear cache by pattern
 * @param {string} pattern - Redis key pattern (e.g., 'pdfs:*')
 */
export const clearCacheByPattern = async (pattern) => {
  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log(`🗑️ Cleared ${keys.length} cache entries matching: ${pattern}`);
      return keys.length;
    }
    return 0;
  } catch (error) {
    console.error('Error clearing cache:', error);
    return 0;
  }
};

/**
 * Get cache statistics
 */
export const getCacheStats = async () => {
  try {
    const info = await redisClient.info('stats');
    const keys = await redisClient.keys('*');
    
    return {
      totalKeys: keys.length,
      info: info
    };
  } catch (error) {
    console.error('Error getting cache stats:', error);
    return null;
  }
};
