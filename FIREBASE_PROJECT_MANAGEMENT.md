# How to Add Projects to Firebase

## Method 1: Using Admin Panel (Recommended)

1. **Open your website**: Go to `http://localhost:3000`
2. **Access Admin Panel**: Navigate to `http://localhost:3000/admin`
3. **Add New Project**:
   - Click "Add New Project" button
   - Fill in the form:
     - **Title**: Project name (e.g., "Beach Photography")
     - **Description**: Brief description
     - **Category**: Choose from dropdown
     - **Main Image URL**: Primary image URL
     - **Project Photos**: Multiple image URLs (one per line)
   - Click "Add Project"

## Method 2: Using Firebase Console

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: "rushankproject"
3. **Open Firestore Database**
4. **Add Document**:
   - Click "Start collection"
   - Collection ID: `projects`
   - Document ID: Auto-generate
   - Add fields:
     ```
     title: "Your Project Title"
     description: "Project description"
     category: "Commissioned Work" (or "Personal" or "Headshots")
     image: "https://your-image-url.com/image.jpg"
     photos: ["https://url1.com", "https://url2.com", "https://url3.com"]
     createdAt: timestamp
     updatedAt: timestamp
     ```

## Method 3: Using Code (For Developers)

You can also add projects programmatically:

```javascript
import { addProject } from './src/firebase/projectService';

const newProject = {
  title: "My New Project",
  description: "Project description",
  category: "Personal",
  image: "https://example.com/main-image.jpg",
  photos: [
    "https://example.com/photo1.jpg",
    "https://example.com/photo2.jpg",
    "https://example.com/photo3.jpg"
  ]
};

// Add to Firebase
addProject(newProject)
  .then(id => console.log('Project added with ID:', id))
  .catch(error => console.error('Error:', error));
```

## Image Hosting Options

For hosting your images, you can use:

1. **Firebase Storage** (Recommended)
   - Upload images to Firebase Storage
   - Get public URLs
   - Use those URLs in your projects

2. **Cloudinary**
   - Free tier available
   - Easy image optimization
   - Get direct URLs

3. **Imgur**
   - Free image hosting
   - Simple to use
   - Direct links available

4. **Your own server**
   - Upload to your web server
   - Use direct URLs

## Project Structure in Firebase

Each project document should have:
```json
{
  "title": "Project Name",
  "description": "Project description",
  "category": "Commissioned Work|Personal|Headshots",
  "image": "https://main-image-url.com",
  "photos": [
    "https://photo1-url.com",
    "https://photo2-url.com"
  ],
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

## Tips for Best Results

1. **Image URLs**: Use high-quality images (at least 800px wide)
2. **Consistent sizing**: Try to use similar aspect ratios
3. **Fast loading**: Use optimized images
4. **Descriptive titles**: Make them clear and professional
5. **Good descriptions**: Help visitors understand the project

## Troubleshooting

- **Images not showing**: Check if URLs are accessible
- **Project not appearing**: Refresh the page or check Firebase console
- **Admin panel not working**: Make sure Firebase is properly configured
- **Slow loading**: Optimize your images before uploading
