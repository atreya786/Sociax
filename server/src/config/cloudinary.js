import dotenv from "dotenv";
dotenv.config(); // ensure env vars are loaded when this module runs

import { v2 as cloudinary } from "cloudinary";

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error(
    "Missing Cloudinary environment variables. Check your .env file."
  );
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// console.log("Cloudinary config:", {
//   cloud_name: CLOUDINARY_CLOUD_NAME,
//   api_key: CLOUDINARY_API_KEY ? "set" : undefined,
//   api_secret: CLOUDINARY_API_SECRET ? "set" : undefined,
// });

export default cloudinary;
