import React, { useState, useEffect } from 'react';
import Gallery from '../components/Gallery';
import { getProjectsByCategory } from '../firebase/projectService';
import { headshots } from '../data/portfolioData';
import './Page.css';

const Headshots = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeadshotProjects = async () => {
      try {
        console.log('🔥 Fetching Headshots projects from Firebase...');
        const headshotProjects = await getProjectsByCategory('Headshots');
        console.log('📋 Headshots projects from Firebase:', headshotProjects);
        
        if (headshotProjects && headshotProjects.length > 0) {
          setProjects(headshotProjects);
          console.log('✅ Using Firebase Headshots projects');
        } else {
          setProjects(headshots);
          console.log('📦 Using static Headshots data as fallback');
        }
      } catch (error) {
        console.error('❌ Error fetching Headshots projects from Firebase:', error);
        setProjects(headshots);
        console.log('📦 Falling back to static Headshots data');
      } finally {
        setLoading(false);
      }
    };

    fetchHeadshotProjects();
  }, []);

  if (loading) {
    return (
      <div className="page">
        <div className="page-content">
          <h1 className="page-title">Headshots</h1>
          <div className="loading-message">Loading projects...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-content">
        <h1 className="page-title">Headshots</h1>
        <Gallery items={projects} />
      </div>
    </div>
  );
};

export default Headshots;
