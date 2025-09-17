import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjectImageUrl } from '../utils/imageUtils';
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
              src={getProjectImageUrl(item)} 
              alt={item.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={(e) => {
                console.error('Image failed to load:', item.image);
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
              }}
            />
            <div className="gallery-overlay">
              <h3 className="gallery-item-title">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
