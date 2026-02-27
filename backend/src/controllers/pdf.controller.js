import PDF from "../models/pdf.model.js";
import { redisClient } from "../config/redis.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";


// Upload PDF (Academy only)
export const uploadPDF = async (req, res) => {
  try {
    const { subject, className, schoolName } = req.body;

    // Validate all required fields
    if (!subject || !className || !schoolName) {
      return res.status(400).json({ 
        message: "All fields are required (subject, className, schoolName)" 
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: "PDF file is required" });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw", // important for PDF
      folder: "educational-pdfs",
      type: "upload",
      access_mode: "public", // Make the PDF publicly accessible
    });
   // 🟢 Delete local temp file
    fs.unlinkSync(req.file.path);

    const pdf = await PDF.create({
      subject,
      className,
      schoolName,
      fileUrl: result.secure_url,   // ✅ CHANGED HERE
      uploadedBy: req.user._id,
    });

    // Invalidate PDF search caches (more efficient than flushAll)
    const keys = await redisClient.keys('pdfs:*');
    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log(`🗑️ Cleared ${keys.length} PDF cache entries (regex search caches)`);
    }

    res.status(201).json({
      message: "PDF uploaded successfully",
      pdf,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Student Search PDFs
export const searchPDFs = async (req, res) => {
  try {
    const { subject, className, schoolName, page = 1, limit = 5 } = req.query;

    // Build filter with case-insensitive partial matching
    const filter = {};

    if (subject) {
      filter.subject = { $regex: subject, $options: 'i' };
    }
    
    if (className) {
      filter.className = { $regex: className, $options: 'i' };
    }
    
    if (schoolName) {
      filter.schoolName = { $regex: schoolName, $options: 'i' };
    }

    const skip = (page - 1) * limit;

    // Create cache key with regex filters
    const cacheKey = `pdfs:search:${JSON.stringify(filter)}:page:${page}:limit:${limit}`;

    // Check Redis
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("Serving from Redis ⚡");
      return res.json(JSON.parse(cachedData));
    }

    const total = await PDF.countDocuments(filter);

    const pdfs = await PDF.find(filter)
      .populate("uploadedBy", "email role")
      .skip(skip)
      .limit(Number(limit));

    // Generate signed URLs for each PDF
    const pdfsWithSignedUrls = pdfs.map(pdf => {
      const pdfObj = pdf.toObject();
      // Extract public_id from the URL
      const urlParts = pdfObj.fileUrl.split('/upload/');
      if (urlParts.length > 1) {
        // Remove version (e.g., v1234567890/) and file extension
        let publicId = urlParts[1].replace(/^v\d+\//, '').replace(/\.pdf$/, '');
        // Generate signed URL with 1 hour expiry
        pdfObj.fileUrl = cloudinary.url(publicId + '.pdf', {
          resource_type: 'raw',
          type: 'upload',
          sign_url: true,
          secure: true
        });
      }
      return pdfObj;
    });

    const response = {
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      data: pdfsWithSignedUrls,
    };

    // Cache for 1 hour (3600 seconds) - PDFs don't change frequently
    await redisClient.set(cacheKey, JSON.stringify(response), { EX: 3600 });

    console.log("Serving from MongoDB 🗄️");

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPDFById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check Redis cache first
    const cacheKey = `pdf:${id}`;
    const cachedPdf = await redisClient.get(cacheKey);
    
    if (cachedPdf) {
      console.log(`📦 Serving PDF ${id} from Redis cache ⚡`);
      return res.json(JSON.parse(cachedPdf));
    }

    const pdf = await PDF.findById(id).populate("uploadedBy", "email");

    if (!pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

    // Generate signed URL for the PDF
    const pdfObj = pdf.toObject();
    const urlParts = pdfObj.fileUrl.split('/upload/');
    if (urlParts.length > 1) {
      // Remove version (e.g., v1234567890/) and file extension
      let publicId = urlParts[1].replace(/^v\d+\//, '').replace(/\.pdf$/, '');
      pdfObj.fileUrl = cloudinary.url(publicId + '.pdf', {
        resource_type: 'raw',
        type: 'upload',
        sign_url: true,
        secure: true
      });
    }

    // Cache for 50 minutes (3000 seconds) - slightly less than signed URL expiry
    await redisClient.set(cacheKey, JSON.stringify(pdfObj), { EX: 3000 });
    console.log(`💾 Cached PDF ${id} in Redis`);

    res.json(pdfObj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};