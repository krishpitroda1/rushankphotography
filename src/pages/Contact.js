import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="page">
      <div className="page-content">
        <h1 className="page-title">Contact</h1>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3>Get In Touch</h3>
            <p>
              I'm always excited to work on new projects and collaborate with 
              creative individuals and brands. Whether you're looking for 
              commercial photography, portraits, or have a unique project in mind, 
              I'd love to hear from you.
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <h4>Email</h4>
                <p>hello@rushankagrawal.com</p>
              </div>
              
              <div className="contact-item">
                <h4>Phone</h4>
                <p>+91 98765 43210</p>
              </div>
              
              <div className="contact-item">
                <h4>Location</h4>
                <p>Mumbai, India</p>
              </div>
              
              <div className="contact-item">
                <h4>Social</h4>
                <div className="social-links">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form">
            <h3>Send Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;