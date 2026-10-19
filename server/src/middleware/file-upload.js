import multer from "multer";
import path from "node:path";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `Resource_Sphere_${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

export const uploadFile = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
  fileFilter: (req, file, cb) => {
    const allowedExtensions = [".csv", ".xlsx", ".docx", ".pdf", ".png", ".jpeg", ".jpg"];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only few files are allowed"));
    }
  },
});