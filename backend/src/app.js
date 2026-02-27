import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import testRoutes from "./routes/test.routes.js";
import path from "path";
import pdfRoutes from "./routes/pdf.routes.js";



const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:5173", // Local development
    "http://localhost:3000", // Alternative local port
    "https://edu-platform-omega-roan.vercel.app", // Production frontend
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
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