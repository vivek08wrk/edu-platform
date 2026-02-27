import express from "express";
import authRoutes from "./routes/auth.routes.js";
import testRoutes from "./routes/test.routes.js";
import path from "path";
import pdfRoutes from "./routes/pdf.routes.js";



const app = express();

// CORS configuration - Allow Vercel frontend and mobile browsers
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://edu-platform-omega-roan.vercel.app", // Old Vercel URL
  "https://edu-platform-seven-chi.vercel.app",  // New Vercel URL
];

// Custom CORS middleware - Fixed for mobile browsers
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Allow requests from allowed origins OR if no origin (mobile apps/Postman)
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else if (!origin) {
    // Mobile browsers sometimes don't send origin on same-site requests
    res.setHeader("Access-Control-Allow-Origin", "*");
  } else if (origin && origin.includes("vercel.app")) {
    // Allow any Vercel preview deployments
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept, Origin, User-Agent");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "86400"); // Cache preflight for 24 hours
  
  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  next();
});

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/pdf", pdfRoutes);
// Health check route
app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

export default app;