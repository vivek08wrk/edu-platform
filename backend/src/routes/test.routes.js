import express from "express";
import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = express.Router();

// Only Academy Access
router.get(
  "/academy-only",
  protect,
  authorizeRoles("academy"),
  (req, res) => {
    res.json({ message: "Welcome Academy User 🚀" });
  }
);

// Only Student Access
router.get(
  "/student-only",
  protect,
  authorizeRoles("student"),
  (req, res) => {
    res.json({ message: "Welcome Student User 🎓" });
  }
);

export default router;