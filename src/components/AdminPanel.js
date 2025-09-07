import React, { useState, useEffect } from 'react';
import { getAllProjects, addProject, updateProject, deleteProject } from '../firebase/projectService';
import ImageUrlHelper from './ImageUrlHelper';
import './AdminPanel.css';

const AdminPanel = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [firebaseError, setFirebaseError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
    photos: []
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      console.log('🔥 Starting Firebase fetch...');
      console.log('📋 Firebase config check:', {
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'rushankproject',
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY ? 'Set' : 'Not set'
      });
      
      const projectsData = await getAllProjects();
      console.log('✅ Firebase fetch successful! Projects:', projectsData);
      setProjects(projectsData);
      
      // Clear any error state
      setFirebaseError(null);
      
    } catch (error) {
      console.error('❌ Firebase fetch failed:', error);
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      
      // Set error state for debugging
      setFirebaseError({
        code: error.code,
        message: error.message,
        timestamp: new Date().toISOString()
      });
      
      // Fallback to local storage
      console.log('🔄 Falling back to localStorage...');
      const localProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      console.log('📦 Projects from localStorage:', localProjects);
      setProjects(localProjects);
      
      // If no projects in localStorage, add some sample data
      if (localProjects.length === 0) {
        console.log('➕ Adding sample projects to localStorage...');
        const sampleProjects = [
          {
            id: 'sample-1',
            title: 'Sample Project 1',
            description: 'This is a sample project',
            category: 'Personal',
            image: 'https://images.unsplash.com/photo-1506905925346-14b5e4c4b6c4?w=400&h=500&fit=crop&crop=center',
            photos: [
              'https://images.unsplash.com/photo-1506905925346-14b5e4c4b6c4?w=800&h=600&fit=crop&crop=center',
              'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&crop=center'
            ]
          }
        ];
        localStorage.setItem('projects', JSON.stringify(sampleProjects));
        setProjects(sampleProjects);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotosChange = (e) => {
    const photos = e.target.value.split('\n').filter(url => url.trim() !== '');
    setFormData(prev => ({
      ...prev,
      photos
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await updateProject(editingProject.id, formData);
        setProjects(prev => prev.map(p => p.id === editingProject.id ? { ...p, ...formData } : p));
      } else {
        const newProjectId = await addProject(formData);
        setProjects(prev => [{ id: newProjectId, ...formData }, ...prev]);
      }
      
      // Also save to localStorage as backup
      const updatedProjects = editingProject 
        ? projects.map(p => p.id === editingProject.id ? { ...p, ...formData } : p)
        : [{ id: new Date().getTime().toString(), ...formData }, ...projects];
      
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      
      resetForm();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project. Please try again.');
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description || '',
      category: project.category || '',
      image: project.image,
      photos: project.photos || []
    });
    setShowForm(true);
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(projectId);
        setProjects(prev => prev.filter(p => p.id !== projectId));
        
        // Update localStorage
        const updatedProjects = projects.filter(p => p.id !== projectId);
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      image: '',
      photos: []
    });
    setEditingProject(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="admin-loading">Loading projects...</div>;
  }

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '20px', borderBottom: '2px solid #ddd' }}>
        <h1 style={{ margin: 0, color: '#333', fontSize: '2rem' }}>Project Management</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => {
              console.log('Add project button clicked');
              setShowForm(true);
            }}
            style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            ➕ Add New Project
          </button>
          <button 
            onClick={async () => {
              console.log('🧪 Testing Firebase connection...');
              try {
                const testProjects = await getAllProjects();
                alert(`✅ Firebase test successful! Found ${testProjects.length} projects.`);
                console.log('Test projects:', testProjects);
              } catch (error) {
                alert(`❌ Firebase test failed: ${error.message}`);
                console.error('Firebase test error:', error);
              }
            }}
            style={{
              background: '#28a745',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            🧪 Test Firebase
          </button>
          <button 
            onClick={() => {
              console.log('🔄 Refreshing projects...');
              setLoading(true);
              fetchProjects();
            }}
            style={{
              background: '#17a2b8',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {showForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#555' }}>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#555' }}>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical', minHeight: '80px' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#555' }}>Category:</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
                >
                  <option value="">Select Category</option>
                  <option value="Commissioned Work">Commissioned Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Headshots">Headshots</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#555' }}>Main Image URL:</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#555' }}>Project Photos (one URL per line):</label>
                <textarea
                  name="photos"
                  value={formData.photos.join('\n')}
                  onChange={handlePhotosChange}
                  rows="5"
                  placeholder="Enter image URLs, one per line"
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '30px' }}>
                <button type="submit" style={{
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  {editingProject ? 'Update Project' : 'Add Project'}
                </button>
                <button type="button" onClick={resetForm} style={{
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ImageUrlHelper />
      
      <div className="projects-list">
        <h2>Existing Projects ({projects.length})</h2>
        <div style={{ marginBottom: '20px', padding: '15px', background: '#e9ecef', borderRadius: '4px', border: '1px solid #dee2e6' }}>
          <h3 style={{ marginTop: 0, color: '#495057' }}>🔍 Debug Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '14px' }}>
            <div>
              <p><strong>Status:</strong></p>
              <p>Loading: {loading ? 'Yes' : 'No'}</p>
              <p>Projects count: {projects.length}</p>
              <p>Show form: {showForm ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p><strong>Firebase Status:</strong></p>
              {firebaseError ? (
                <div style={{ color: '#dc3545' }}>
                  <p>❌ Error: {firebaseError.code}</p>
                  <p>Message: {firebaseError.message}</p>
                  <p>Time: {new Date(firebaseError.timestamp).toLocaleTimeString()}</p>
                </div>
              ) : (
                <p style={{ color: '#28a745' }}>✅ Connected</p>
              )}
            </div>
          </div>
          <details style={{ marginTop: '10px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Raw Projects Data</summary>
            <pre style={{ 
              background: '#f8f9fa', 
              padding: '10px', 
              borderRadius: '4px', 
              overflow: 'auto', 
              fontSize: '12px',
              maxHeight: '200px'
            }}>
              {JSON.stringify(projects, null, 2)}
            </pre>
          </details>
        </div>
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <img src={project.image} alt={project.title} />
              <div className="project-info">
                <h3>{project.title}</h3>
                <p className="project-category">{project.category}</p>
                <p className="project-photos-count">
                  {project.photos ? project.photos.length : 0} photos
                </p>
              </div>
              <div className="project-actions">
                <button 
                  onClick={() => handleEdit(project)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(project.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
