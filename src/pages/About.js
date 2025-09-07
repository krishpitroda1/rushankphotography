import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="page">
      <div className="page-content">
        <h1 className="page-title">About</h1>
        
        <div className="about-content">
          <div className="about-text">
            <p>
              I am a passionate photographer with over 10 years of experience capturing 
              moments that tell compelling stories. My work spans across commercial 
              photography, celebrity portraits, fashion shoots, and personal projects.
            </p>
            <p>
              Based in Mumbai, I have had the privilege of working with some of the 
              biggest names in entertainment, sports, and business. My approach combines 
              technical expertise with creative vision to produce images that resonate 
              with audiences worldwide.
            </p>
            <p>
              When I'm not behind the camera, you can find me exploring new techniques, 
              mentoring aspiring photographers, or traveling to discover new perspectives 
              and inspiration for my work.
            </p>
            
            <div className="about-stats">
              <div className="stat">
                <h3>500+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat">
                <h3>50+</h3>
                <p>Celebrities Photographed</p>
              </div>
              <div className="stat">
                <h3>10+</h3>
                <p>Years Experience</p>
              </div>
            </div>
          </div>
          
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=center" 
              alt="Photographer at work"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
