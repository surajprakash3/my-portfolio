import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { usePortfolio } from '../hooks/usePortfolio';
import ProjectCard from '../components/ProjectCard';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Projects.css';

const Projects = () => {
  const { projects, loading, fetchProjects } = usePortfolio();
  const [portfolioUserId, setPortfolioUserId] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Get portfolio user ID on initial load
  useEffect(() => {
    const getPortfolioUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/portfolio/user`);
        setPortfolioUserId(response.data._id);
      } catch (error) {
        console.error('Error fetching portfolio user:', error);
      }
    };
    
    getPortfolioUser();
  }, [API_URL]);

  // Fetch projects once we have the user ID
  useEffect(() => {
    if (portfolioUserId) {
      fetchProjects(portfolioUserId).catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolioUserId]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="projects-page">
      <div className="page-header">
        <h1>My Projects</h1>
        <p>A collection of my best work</p>
      </div>

      {projects && projects.length > 0 ? (
        <div className="projects-grid-full">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No projects yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
};

export default Projects;
