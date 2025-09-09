import React, { useState, useEffect } from 'react';
import Gallery from '../components/Gallery';
import { getProjectsByCategory } from '../firebase/projectService';
import { personalWork } from '../data/portfolioData';
import './Page.css';

const Personal = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonalProjects = async () => {
      try {
        console.log('🔥 Fetching Personal projects from Firebase...');
        const personalProjects = await getProjectsByCategory('Personal');
        console.log('📋 Personal projects from Firebase:', personalProjects);
        
        if (personalProjects && personalProjects.length > 0) {
          setProjects(personalProjects);
          console.log('✅ Using Firebase Personal projects');
        } else {
          setProjects(personalWork);
          console.log('📦 Using static Personal data as fallback');
        }
      } catch (error) {
        console.error('❌ Error fetching Personal projects from Firebase:', error);
        setProjects(personalWork);
        console.log('📦 Falling back to static Personal data');
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalProjects();
  }, []);

  if (loading) {
    return (
      <div className="page">
        <div className="page-content">
          <h1 className="page-title">Personal</h1>
          <div className="loading-message">Loading projects...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-content">
        <h1 className="page-title">Personal</h1>
        <Gallery items={projects} />
      </div>
    </div>
  );
};

export default Personal;
