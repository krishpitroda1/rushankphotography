/**
 * Utility functions for handling image URLs, especially Google Drive links
 */

/**
 * Converts Google Drive sharing links to direct image URLs
 * @param {string} url - The Google Drive URL
 * @returns {string} - Direct image URL or original URL if not a Google Drive link
 */
export const convertGoogleDriveUrl = (url) => {
  if (!url) return '';
  
  // Handle Google Drive file links
  // Format: https://drive.google.com/file/d/FILE_ID/view
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
  if (fileMatch) {
    const fileId = fileMatch[1];
    // Prefer the thumbnail endpoint for reliable <img> embedding
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`;
  }
  
  // Handle Google Drive folder links (these won't work as direct images)
  // Format: https://drive.google.com/drive/u/1/folders/FOLDER_ID
  const folderMatch = url.match(/\/folders\/([a-zA-Z0-9-_]+)/);
  if (folderMatch) {
    console.warn('Google Drive folder links cannot be used as direct image URLs:', url);
    return ''; // Return empty string for folder links
  }
  
  // Handle direct Google Drive image URLs
  // Format: https://drive.google.com/uc?export=view&id=FILE_ID
  if (url.includes('drive.google.com/uc?export=view')) {
    // Try to extract id and convert to thumbnail to avoid occasional cookie-gated responses
    const idMatch = url.match(/[?&]id=([a-zA-Z0-9-_]+)/);
    if (idMatch) {
      const fileId = idMatch[1];
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`;
    }
    return url;
  }
  
  // Already a thumbnail URL – allow through
  if (url.includes('drive.google.com/thumbnail?id=')) {
    return url;
  }
  
  // Return original URL if it's not a Google Drive link
  return url;
};

/**
 * Processes an array of image URLs, converting Google Drive links
 * @param {Array} urls - Array of image URLs
 * @returns {Array} - Array of processed URLs
 */
export const processImageUrls = (urls) => {
  if (!Array.isArray(urls)) return [];
  
  return urls.map(url => convertGoogleDriveUrl(url)).filter(url => url !== '');
};

/**
 * Gets the best available image URL from a project
 * @param {Object} project - Project object
 * @returns {string} - Best available image URL
 */
export const getProjectImageUrl = (project) => {
  if (!project) return '';
  
  // Try to get image from photos array first
  if (project.photos && project.photos.length > 0) {
    const firstPhoto = convertGoogleDriveUrl(project.photos[0]);
    if (firstPhoto) return firstPhoto;
  }
  
  // Fallback to main image
  if (project.image) {
    return convertGoogleDriveUrl(project.image);
  }
  
  return '';
};

/**
 * Validates if a URL is a valid image URL
 * @param {string} url - URL to validate
 * @returns {boolean} - True if URL appears to be a valid image
 */
export const isValidImageUrl = (url) => {
  if (!url) return false;
  
  // Check for common image extensions
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const hasImageExtension = imageExtensions.some(ext => 
    url.toLowerCase().includes(ext)
  );
  
  // Check for Google Drive direct URLs
  const isGoogleDriveDirect = url.includes('drive.google.com/uc?export=view');
  
  // Check for other common image hosting services
  const isImageHosting = url.includes('imgur.com') || 
                        url.includes('unsplash.com') || 
                        url.includes('pexels.com') ||
                        url.includes('cloudinary.com');
  
  return hasImageExtension || isGoogleDriveDirect || isImageHosting;
};

/**
 * Adds error handling to image loading
 * @param {string} url - Image URL
 * @param {string} fallbackUrl - Fallback URL if main URL fails
 * @returns {string} - URL to use for image
 */
export const getImageWithFallback = (url, fallbackUrl = '') => {
  const processedUrl = convertGoogleDriveUrl(url);
  
  if (isValidImageUrl(processedUrl)) {
    return processedUrl;
  }
  
  if (fallbackUrl) {
    const processedFallback = convertGoogleDriveUrl(fallbackUrl);
    if (isValidImageUrl(processedFallback)) {
      return processedFallback;
    }
  }
  
  // Return a placeholder image if no valid URL is found
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
};
