import React from 'react';
import Gallery from '../components/Gallery';
import { headshots } from '../data/portfolioData';
import './Page.css';

const Headshots = () => {
  return (
    <div className="page">
      <div className="page-content">
        <h1 className="page-title">Headshots</h1>
        <Gallery items={headshots} />
      </div>
    </div>
  );
};

export default Headshots;
