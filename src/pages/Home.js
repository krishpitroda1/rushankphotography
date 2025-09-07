import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Gallery from '../components/Gallery';
import { getAllProjects } from '../firebase/projectService';
import { commissionedWork } from '../data/portfolioData';
import './Home.css';

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        console.log('🔥 Fetching featured projects from Firebase...');
        const allProjects = await getAllProjects();
        console.log('📋 All projects from Firebase:', allProjects);
        
        // Use Firebase projects if available, otherwise fallback to static data
        if (allProjects && allProjects.length > 0) {
          setFeaturedProjects(allProjects.slice(0, 8));
          console.log('✅ Using Firebase projects for featured work');
        } else {
          setFeaturedProjects(commissionedWork.slice(0, 8));
          console.log('📦 Using static data as fallback');
        }
      } catch (error) {
        console.error('❌ Error fetching projects from Firebase:', error);
        // Fallback to static data
        setFeaturedProjects(commissionedWork.slice(0, 8));
        console.log('📦 Falling back to static data');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  if (loading) {
    return (
      <div className="home">
        <section className="hero">
          <div className="hero-content"> 
            <h1>Capturing moments that matter</h1>
          </div>
        </section>
        <section className="main-content">
          <div className="featured-work">
            <h2 className="section-title">Featured Work</h2>
            <div className="loading-message">Loading projects...</div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content"> 
          <h1>Capturing moments that matter</h1>
        </div>
      </section>

      <section className="main-content">
        <div className="featured-work">
          <h2 className="section-title">Featured Work</h2>
          <Gallery items={featuredProjects} />
          <div className="view-all">
            <Link to="/commissioned-work" className="cta-button">
              View All Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
