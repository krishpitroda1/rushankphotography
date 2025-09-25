import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Home from './pages/Home';
import CommissionedWork from './pages/CommissionedWork';
import Personal from './pages/Personal';
import Headshots from './pages/Headshots';
import About from './pages/About';
import Contact from './pages/Contact';
import ProjectDetail from './components/ProjectDetail';
import AdminPanel from './components/AdminPanel';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/commissioned-work" element={<CommissionedWork />} />
            <Route path="/personal" element={<Personal />} />
            <Route path="/headshots" element={<Headshots />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
