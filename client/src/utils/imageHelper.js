// Helper function to get the correct image URL
// Handles both Cloudinary URLs (full URLs) and local paths (backward compatibility)
export const getImageUrl = (img) => {
  if (!img) return null;
  
  // If the image is a full URL (Cloudinary), use it as is
  if (img.startsWith('http://') || img.startsWith('https://')) {
    return img;
  }
  
  // Otherwise, it's a local path (old images)
  return `../upload/${img}`;
};

