# Firebase Setup Instructions

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "photography-portfolio")
4. Enable Google Analytics (optional)
5. Click "Create project"

## 2. Set up Firestore Database

1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location for your database
5. Click "Done"

## 3. Set up Firebase Storage (Optional)

1. Go to "Storage" in your Firebase project
2. Click "Get started"
3. Choose "Start in test mode"
4. Select a location for your storage
5. Click "Done"

## 4. Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web" icon to add a web app
4. Register your app with a nickname
5. Copy the Firebase configuration object

## 5. Update Firebase Configuration

1. Open `src/firebase/config.js`
2. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
};
```

## 6. Set up Firestore Security Rules

In Firestore Database > Rules, update the rules to allow read/write access:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // For development only
    }
  }
}
```

**⚠️ Important:** This rule allows anyone to read/write to your database. For production, implement proper authentication and security rules.

## 7. Migrate Your Data (Optional)

If you want to migrate your existing portfolio data to Firebase:

1. Open your browser's developer console
2. Navigate to your website
3. Run the following commands:

```javascript
// Import the migration function
import { migrateDataToFirebase, saveDataToLocalStorage } from './src/utils/dataMigration.js';

// Save data to localStorage as backup
saveDataToLocalStorage();

// Migrate to Firebase (only if Firebase is properly configured)
migrateDataToFirebase();
```

## 8. Test Your Setup

1. Start your development server: `npm start`
2. Navigate to `/admin` to access the admin panel
3. Try adding a new project
4. Check if projects appear on the home page
5. Click on a project to view its detail page

## 9. Production Considerations

Before deploying to production:

1. Set up proper Firestore security rules
2. Implement user authentication for admin access
3. Set up Firebase Storage for image uploads
4. Configure proper CORS settings
5. Set up monitoring and error tracking

## Troubleshooting

### Common Issues:

1. **"Firebase not initialized"**: Check your configuration values
2. **"Permission denied"**: Update your Firestore security rules
3. **"Network error"**: Check your internet connection and Firebase project status
4. **Images not loading**: Verify image URLs are accessible

### Fallback Mode:

If Firebase is not configured, the app will automatically fall back to using localStorage and static data from `portfolioData.js`.
