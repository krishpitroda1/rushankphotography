import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db } from './config';

const PROJECTS_COLLECTION = 'projects';

// Get all projects
export const getAllProjects = async () => {
  try {
    const projectsRef = collection(db, PROJECTS_COLLECTION);
    const q = query(projectsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting projects:', error);
    throw error;
  }
};

// Get project by ID
export const getProjectById = async (id) => {
  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, id);
    const projectSnap = await getDoc(projectRef);
    
    if (projectSnap.exists()) {
      return {
        id: projectSnap.id,
        ...projectSnap.data()
      };
    } else {
      throw new Error('Project not found');
    }
  } catch (error) {
    console.error('Error getting project:', error);
    throw error;
  }
};

// Add new project
export const addProject = async (projectData) => {
  try {
    const projectsRef = collection(db, PROJECTS_COLLECTION);
    const docRef = await addDoc(projectsRef, {
      ...projectData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding project:', error);
    throw error;
  }
};

// Update project
export const updateProject = async (id, projectData) => {
  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, id);
    await updateDoc(projectRef, {
      ...projectData,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

// Delete project
export const deleteProject = async (id) => {
  try {
    const projectRef = doc(db, PROJECTS_COLLECTION, id);
    await deleteDoc(projectRef);
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

// Get projects by category
export const getProjectsByCategory = async (category) => {
  try {
    const projects = await getAllProjects();
    return projects.filter(project => project.category === category);
  } catch (error) {
    console.error('Error getting projects by category:', error);
    throw error;
  }
};