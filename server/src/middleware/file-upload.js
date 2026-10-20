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

const uploadFile = multer({
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


export default function handleMulterUpload(req, res, next){
  uploadFile.single('file')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ 
            success: false, 
            message: 'File is too large. Maximum limit is 10MB.' 
          });
        }
        return res.status(400).json({ success: false, message: err.message });
      }
      // Catch custom errors from your fileFilter (e.g., "Only few files are allowed")
      return res.status(400).json({ success: false, message: err.message });
    }
    
    // If no errors, move on to ResourceController.uploadFile
    next();
  });
};