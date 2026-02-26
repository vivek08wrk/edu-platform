import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import testRoutes from "./routes/test.routes.js";
import path from "path";
import pdfRoutes from "./routes/pdf.routes.js";



const app = express();

app.use(cors());
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