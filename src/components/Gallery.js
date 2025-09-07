import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Gallery.css';

const Gallery = ({ items, title, category }) => {
  const navigate = useNavigate();

  const handleProjectClick = (item) => {
    // Navigate to project detail page
    navigate(`/project/${item.id}`);
  };

  return (
    <div className="gallery-section">
      {title && <h2 className="gallery-title">{title}</h2>}
      <div className="gallery">
        {items.map((item, index) => (
          <div 
            key={item.id || index} 
            className="gallery-item"
            onClick={() => handleProjectClick(item)}
          >
            <img 
              src={item.image} 
              alt={item.title}
              loading="lazy"
            />
            <div className="gallery-overlay">
              <h3 className="gallery-item-title">{item.title}</h3>
              {item.category && (
                <span className="gallery-item-category">{item.category}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
