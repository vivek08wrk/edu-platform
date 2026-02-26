import dotenv from "dotenv";

// Load environment variables FIRST before any other imports
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import { connectRedis } from "./config/redis.js";
import { initializeCache } from "./utils/cacheWarmer.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await connectRedis();

    // Initialize cache warming (runs in background)
    initializeCache().catch(err => 
      console.error("Cache initialization error:", err)
    );

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
  }
};

startServer();