import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      required: true,
    },
    schoolName: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

pdfSchema.index({ subject: 1, className: 1, schoolName: 1 });
export default mongoose.model("PDF", pdfSchema);