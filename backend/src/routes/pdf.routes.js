import express from "express";
import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";
import upload from "../middleware/upload.middleware.js";
import { uploadPDF, searchPDFs, getPDFById } from "../controllers/pdf.controller.js";
import { getCacheStats, clearCacheByPattern } from "../middleware/cache.middleware.js";

const router = express.Router();

// Academy Only Upload
router.post(
  "/upload",
  protect,
  authorizeRoles("academy"),
  upload.single("file"),
  uploadPDF
);
// Student Search
router.get(
  "/search",
  protect,
  authorizeRoles("student"),
  searchPDFs
);

router.get(
  "/:id",
  protect,
  authorizeRoles("student"),
  getPDFById
);

// Cache stats endpoint (for monitoring)
router.get(
  "/admin/cache-stats",
  protect,
  authorizeRoles("academy"),
  async (req, res) => {
    try {
      const stats = await getCacheStats();
      res.json({ 
        success: true, 
        stats,
        message: "Cache statistics retrieved successfully"
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Clear cache endpoint (for admins)
router.delete(
  "/admin/clear-cache",
  protect,
  authorizeRoles("academy"),
  async (req, res) => {
    try {
      const clearedCount = await clearCacheByPattern("pdfs:*");
      res.json({ 
        success: true,
        clearedCount,
        message: `Cleared ${clearedCount} cache entries`
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;