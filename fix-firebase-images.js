// Quick script to fix Firebase image URLs
// Run this in your browser console on the admin page

const fixFirebaseImages = () => {
  console.log('🔧 Starting Firebase image URL fix...');
  
  // Your Google Drive URL
  const googleDriveUrl = 'https://drive.google.com/file/d/1EzwrfwsU6M0GPUCxRRvaKwsB8pEq41Ud/view';
  
  // Convert to direct image URL
  const fileId = googleDriveUrl.match(/\/file\/d\/([a-zA-Z0-9-_]+)/)?.[1];
  const directImageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
  
  console.log('📋 Original URL:', googleDriveUrl);
  console.log('✅ Converted URL:', directImageUrl);
  
  // Instructions for manual update
  console.log(`
🎯 MANUAL UPDATE INSTRUCTIONS:

1. Go to your Firebase Console
2. Find the project with ID: BW2KiEdvQLeIXF4yb2QA
3. Update these fields:

   image: "${directImageUrl}"
   photos: ["${directImageUrl}"]

4. Save the changes
5. Refresh your website

The converted URL is: ${directImageUrl}
  `);
  
  return directImageUrl;
};

// Run the fix
const convertedUrl = fixFirebaseImages();

// Copy to clipboard if possible
if (navigator.clipboard) {
  navigator.clipboard.writeText(convertedUrl).then(() => {
    console.log('📋 URL copied to clipboard!');
  });
}
