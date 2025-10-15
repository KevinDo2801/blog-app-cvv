import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Enable CORS
app.use(cors({
  origin: [
    "http://localhost:3000",               
    "https://blog-app-cv.vercel.app",
    "https://blog-app-cv.onrender.com"
  ],
  credentials: true
}));

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog-posts",
    format: async (req, file) => {
      // Extract file extension from mimetype
      const ext = file.mimetype.split('/')[1];
      return ext;
    },
    public_id: (req, file) => {
      // Generate unique filename
      return Date.now() + '-' + file.originalname.split('.')[0];
    },
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cookieParser());

app.post("/api/upload", (req, res, next) => {
  upload.single("file")(req, res, function (err) {
    if (err) {
      console.error("Upload error:", err);
      return res.status(500).json({ 
        error: "Error uploading file", 
        message: err.message,
        details: err.toString()
      });
    }
    
    if (!req.file) {
      console.log("No file in request");
      return res.status(400).json("No file uploaded");
    }
    
    console.log("File uploaded successfully:", req.file.path);
    // Return the Cloudinary URL
    res.status(200).json(req.file.path);
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(process.env.PORT || 8800, () => {
  console.log("Server running...");
});

