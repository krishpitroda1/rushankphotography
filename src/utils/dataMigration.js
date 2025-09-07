import { addProject } from '../firebase/projectService';
import { commissionedWork, personalWork, headshots } from '../data/portfolioData';

// Function to migrate local data to Firebase
export const migrateDataToFirebase = async () => {
  try {
    console.log('Starting data migration to Firebase...');
    
    // Migrate commissioned work
    for (const project of commissionedWork) {
      try {
        await addProject({
          ...project,
          category: 'Commissioned Work'
        });
        console.log(`Migrated: ${project.title}`);
      } catch (error) {
        console.error(`Error migrating ${project.title}:`, error);
      }
    }
    
    // Migrate personal work
    for (const project of personalWork) {
      try {
        await addProject({
          ...project,
          category: 'Personal',
          description: project.description || `Personal photography project: ${project.title}`,
          photos: [project.image] // Use main image as the only photo for personal work
        });
        console.log(`Migrated: ${project.title}`);
      } catch (error) {
        console.error(`Error migrating ${project.title}:`, error);
      }
    }
    
    // Migrate headshots
    for (const project of headshots) {
      try {
        await addProject({
          ...project,
          category: 'Headshots',
          description: project.description || `Professional headshot: ${project.title}`,
          photos: [project.image] // Use main image as the only photo for headshots
        });
        console.log(`Migrated: ${project.title}`);
      } catch (error) {
        console.error(`Error migrating ${project.title}:`, error);
      }
    }
    
    console.log('Data migration completed!');
  } catch (error) {
    console.error('Error during data migration:', error);
  }
};

// Function to save data to localStorage as backup
export const saveDataToLocalStorage = () => {
  try {
    const allProjects = [
      ...commissionedWork.map(p => ({ ...p, category: 'Commissioned Work' })),
      ...personalWork.map(p => ({ 
        ...p, 
        category: 'Personal',
        description: p.description || `Personal photography project: ${p.title}`,
        photos: [p.image]
      })),
      ...headshots.map(p => ({ 
        ...p, 
        category: 'Headshots',
        description: p.description || `Professional headshot: ${p.title}`,
        photos: [p.image]
      }))
    ];
    
    localStorage.setItem('projects', JSON.stringify(allProjects));
    console.log('Data saved to localStorage as backup');
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};
