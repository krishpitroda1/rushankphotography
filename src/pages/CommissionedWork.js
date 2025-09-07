import React, { useState, useEffect } from 'react';
import Gallery from '../components/Gallery';
import { getProjectsByCategory } from '../firebase/projectService';
import { commissionedWork } from '../data/portfolioData';
import './Page.css';

const CommissionedWork = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('🔥 Fetching commissioned work from Firebase...');
        const firebaseProjects = await getProjectsByCategory('Commissioned Work');
        console.log('📋 Commissioned projects from Firebase:', firebaseProjects);
        
        if (firebaseProjects && firebaseProjects.length > 0) {
          setProjects(firebaseProjects);
          console.log('✅ Using Firebase projects for commissioned work');
        } else {
          setProjects(commissionedWork);
          console.log('📦 Using static data as fallback');
        }
      } catch (error) {
        console.error('❌ Error fetching commissioned projects from Firebase:', error);
        setProjects(commissionedWork);
        console.log('📦 Falling back to static data');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="page">
        <div className="page-content">
          <h1 className="page-title">Commissioned Work</h1>
          <div className="loading-message">Loading projects...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-content">
        <h1 className="page-title">Commissioned Work</h1>
        <Gallery items={projects} />
      </div>
    </div>
  );
};

export default CommissionedWork;
