import PDF from "../models/pdf.model.js";
import { redisClient } from "../config/redis.js";
import cloudinary from "../config/cloudinary.js";

/**
 * Warm up cache with most recent PDFs on server startup
 */
export const warmUpCache = async () => {
  try {
    console.log("🔥 Starting cache warm-up...");

    // Get the 20 most recent PDFs
    const recentPdfs = await PDF.find()
      .populate("uploadedBy", "email role")
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    let cachedCount = 0;

    for (const pdf of recentPdfs) {
      try {
        // Generate signed URL
        const urlParts = pdf.fileUrl.split('/upload/');
        if (urlParts.length > 1) {
          let publicId = urlParts[1].replace(/^v\d+\//, '').replace(/\.pdf$/, '');
          pdf.fileUrl = cloudinary.url(publicId + '.pdf', {
            resource_type: 'raw',
            type: 'upload',
            sign_url: true,
            secure: true
          });
        }

        // Cache the PDF
        const cacheKey = `pdf:${pdf._id}`;
        await redisClient.set(cacheKey, JSON.stringify(pdf), { EX: 3000 });
        cachedCount++;
      } catch (err) {
        console.error(`Failed to cache PDF ${pdf._id}:`, err.message);
      }
    }

    console.log(`✅ Cache warm-up complete! Cached ${cachedCount} PDFs`);
  } catch (error) {
    console.error("❌ Cache warm-up failed:", error.message);
  }
};

/**
 * Pre-cache popular search queries
 */
export const cachePopularSearches = async () => {
  try {
    console.log("🔍 Pre-caching popular searches...");

    // Common search patterns with regex for consistency with search controller
    const popularSearches = [
      { subject: { $regex: "Mathematics", $options: 'i' } },
      { subject: { $regex: "Physics", $options: 'i' } },
      { subject: { $regex: "Chemistry", $options: 'i' } },
      { className: { $regex: "10th Grade", $options: 'i' } },
      { className: { $regex: "12th Grade", $options: 'i' } },
    ];

    let cachedCount = 0;

    for (const filter of popularSearches) {
      try {
        const pdfs = await PDF.find(filter)
          .populate("uploadedBy", "email role")
          .limit(6)
          .lean();

        if (pdfs.length > 0) {
          // Generate signed URLs
          const pdfsWithSignedUrls = pdfs.map(pdf => {
            const urlParts = pdf.fileUrl.split('/upload/');
            if (urlParts.length > 1) {
              let publicId = urlParts[1].replace(/^v\d+\//, '').replace(/\.pdf$/, '');
              pdf.fileUrl = cloudinary.url(publicId + '.pdf', {
                resource_type: 'raw',
                type: 'upload',
                sign_url: true,
                secure: true
              });
            }
            return pdf;
          });

          const response = {
            total: await PDF.countDocuments(filter),
            page: 1,
            totalPages: Math.ceil(pdfs.length / 6),
            data: pdfsWithSignedUrls,
          };

          // Use the same cache key format as search controller
          const cacheKey = `pdfs:search:${JSON.stringify(filter)}:page:1:limit:6`;
          await redisClient.set(cacheKey, JSON.stringify(response), { EX: 3600 });
          cachedCount++;
        }
      } catch (err) {
        console.error(`Failed to cache search ${JSON.stringify(filter)}:`, err.message);
      }
    }

    console.log(`✅ Pre-cached ${cachedCount} popular searches`);
  } catch (error) {
    console.error("❌ Popular search caching failed:", error.message);
  }
};

/**
 * Run all cache warming tasks
 */
export const initializeCache = async () => {
  console.log("\n🚀 Initializing Redis cache optimization...\n");
  await warmUpCache();
  await cachePopularSearches();
  console.log("\n✨ Redis cache optimization complete!\n");
};
