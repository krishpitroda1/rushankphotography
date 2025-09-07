import React from 'react';
import Gallery from '../components/Gallery';
import { personalWork } from '../data/portfolioData';
import './Page.css';

const Personal = () => {
  return (
    <div className="page">
      <div className="page-content">
        <h1 className="page-title">Personal</h1>
        <Gallery items={personalWork} />
      </div>
    </div>
  );
};

export default Personal;
