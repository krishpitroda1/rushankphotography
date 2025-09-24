import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectById } from '../firebase/projectService';
import { processImageUrls, getImageWithFallback } from '../utils/imageUtils';
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
        const processedPhotos = processImageUrls(projectData.photos || []);
        const normalizedProject = {
          ...projectData,
          photos: processedPhotos,
          image: getImageWithFallback(projectData.image || projectData.photos?.[0] || '')
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
          const processedLocalPhotos = processImageUrls(localProject.photos || []);
          setProject({
            ...localProject,
            photos: processedLocalPhotos,
            image: getImageWithFallback(localProject.image || localProject.photos?.[0] || '')
          });
          setCurrentImageIndex(0); // Reset to first image
        } else {
          // Try to find in static data as last resort
          const { commissionedWork, personalWork, headshots } = await import('../data/portfolioData');
          const allStaticProjects = [...commissionedWork, ...personalWork, ...headshots];
          const staticProject = allStaticProjects.find(p => p.id === id);
          if (staticProject) {
            console.log('📚 Using static project data:', staticProject);
            const processedStaticPhotos = processImageUrls(staticProject.photos || []);
            setProject({
              ...staticProject,
              photos: processedStaticPhotos,
              image: getImageWithFallback(staticProject.image || staticProject.photos?.[0] || '')
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

  const nextImage = useCallback(() => {
    if (project && project.photos && project.photos.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === project.photos.length - 1 ? 0 : prev + 1
      );
    }
  }, [project]);

  const prevImage = useCallback(() => {
    if (project && project.photos && project.photos.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? project.photos.length - 1 : prev - 1
      );
    }
  }, [project]);

  const goToImage = useCallback((index) => {
    if (project && project.photos && project.photos.length > index) {
      setCurrentImageIndex(index);
    }
  }, [project]);

  const handleClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleClose, nextImage, prevImage]);

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
        <div className="navigation-buttons">
          {/* <button onClick={handleBack} className="back-button">
            ← Back
          </button> */}
          <button onClick={handleClose} className="close-button">
            ✕ Close
          </button>
        </div>
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
                referrerPolicy="no-referrer"
                onError={(e) => {
                  console.error('Main image failed to load:', project.photos[currentImageIndex] || project.image);
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
                }}
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
              referrerPolicy="no-referrer"
              onError={(e) => {
                console.error('Single image failed to load:', project.image);
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
              }}
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
                referrerPolicy="no-referrer"
                onError={(e) => {
                  console.error('Thumbnail failed to load:', photo);
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                }}
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
