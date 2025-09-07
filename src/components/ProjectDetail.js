import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectById } from '../firebase/projectService';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Try Firebase first
        const projectData = await getProjectById(id);
        console.log('📋 Project data from Firebase:', projectData);
        
        // Validate and normalize project data
        const normalizedProject = {
          ...projectData,
          photos: projectData.photos || [],
          image: projectData.image || projectData.photos?.[0] || ''
        };
        
        setProject(normalizedProject);
        setCurrentImageIndex(0); // Reset to first image
        console.log('✅ Project loaded successfully:', normalizedProject);
      } catch (error) {
        console.error('❌ Error fetching project from Firebase:', error);
        // Fallback to local data if Firebase fails
        const localProjects = JSON.parse(localStorage.getItem('projects') || '[]');
        const localProject = localProjects.find(p => p.id === id);
        if (localProject) {
          console.log('📦 Using local project data:', localProject);
          setProject({
            ...localProject,
            photos: localProject.photos || [],
            image: localProject.image || localProject.photos?.[0] || ''
          });
          setCurrentImageIndex(0); // Reset to first image
        } else {
          // Try to find in static data as last resort
          const { commissionedWork, personalWork, headshots } = await import('../data/portfolioData');
          const allStaticProjects = [...commissionedWork, ...personalWork, ...headshots];
          const staticProject = allStaticProjects.find(p => p.id === id);
          if (staticProject) {
            console.log('📚 Using static project data:', staticProject);
            setProject({
              ...staticProject,
              photos: staticProject.photos || [],
              image: staticProject.image || staticProject.photos?.[0] || ''
            });
            setCurrentImageIndex(0); // Reset to first image
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const nextImage = () => {
    if (project && project.photos && project.photos.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === project.photos.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (project && project.photos && project.photos.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? project.photos.length - 1 : prev - 1
      );
    }
  };

  const goToImage = (index) => {
    if (project && project.photos && project.photos.length > index) {
      setCurrentImageIndex(index);
    }
  };

  if (loading) {
    return (
      <div className="project-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-detail-error">
        <h2>Project not found</h2>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="project-detail">
      <div className="project-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        <h1 className="project-title">{project.title}</h1>
        {project.description && (
          <p className="project-description">{project.description}</p>
        )}
      </div>

      <div className="project-gallery">
        <div className="main-image-container">
          {project.photos && project.photos.length > 0 ? (
            <>
              <img 
                src={project.photos[currentImageIndex] || project.image} 
                alt={`${project.title} - ${currentImageIndex + 1}`}
                className="main-image"
              />
              
              {project.photos.length > 1 && (
                <>
                  <button 
                    className="nav-button prev-button" 
                    onClick={prevImage}
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button 
                    className="nav-button next-button" 
                    onClick={nextImage}
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </>
              )}
            </>
          ) : (
            <img 
              src={project.image} 
              alt={project.title}
              className="main-image"
            />
          )}
        </div>

        {project.photos && project.photos.length > 1 && (
          <div className="thumbnail-container">
            {project.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`${project.title} thumbnail ${index + 1}`}
                className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => goToImage(index)}
              />
            ))}
          </div>
        )}

        {project.photos && project.photos.length > 0 && (
          <div className="image-counter">
            {currentImageIndex + 1} / {project.photos.length}
          </div>
        )}
      </div>

      {project.category && (
        <div className="project-meta">
          <span className="project-category">{project.category}</span>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
