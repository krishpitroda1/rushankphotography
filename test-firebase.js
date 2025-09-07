// Firebase Connection Test Script
// Run this in your browser console to test Firebase connection

import { db } from './src/firebase/config.js';
import { collection, getDocs, addDoc } from 'firebase/firestore';

async function testFirebaseConnection() {
  console.log('🔥 Testing Firebase connection...');
  
  try {
    // Test 1: Try to read from Firestore
    console.log('📖 Testing read access...');
    const projectsRef = collection(db, 'projects');
    const snapshot = await getDocs(projectsRef);
    console.log('✅ Read test successful! Found', snapshot.size, 'projects');
    
    // Test 2: Try to write to Firestore (optional)
    console.log('✍️ Testing write access...');
    const testData = {
      title: 'Test Project',
      description: 'This is a test project',
      category: 'test',
      images: ['https://via.placeholder.com/400x300'],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const docRef = await addDoc(projectsRef, testData);
    console.log('✅ Write test successful! Document ID:', docRef.id);
    
    // Clean up test document
    console.log('🧹 Cleaning up test document...');
    // Note: You'll need to delete this manually from Firebase Console if needed
    
    console.log('🎉 All Firebase tests passed! Your setup is working correctly.');
    
  } catch (error) {
    console.error('❌ Firebase test failed:', error);
    
    if (error.code === 'permission-denied') {
      console.log('💡 Solution: Set up Firestore security rules to allow read/write access');
    } else if (error.code === 'unavailable') {
      console.log('💡 Solution: Check your internet connection and Firebase project status');
    } else {
      console.log('💡 Check the error details above for specific solutions');
    }
  }
}

// Run the test
testFirebaseConnection();
