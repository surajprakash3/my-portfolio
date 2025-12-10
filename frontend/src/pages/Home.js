import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { usePortfolio } from '../hooks/usePortfolio';
import ProjectCard from '../components/ProjectCard';
import SkillCard from '../components/SkillCard';
import ExperienceCard from '../components/ExperienceCard';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Home.css';

const Home = () => {
  const { profile, projects, skills, experience, loading, fetchProfile, fetchProjects, fetchSkills, fetchExperience } = usePortfolio();
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

  // Fetch portfolio data once we have the user ID
  useEffect(() => {
    if (portfolioUserId) {
      // Fetch all data in parallel for faster loading
      Promise.all([
        fetchProfile(portfolioUserId),
        fetchProjects(portfolioUserId),
        fetchSkills(portfolioUserId),
        fetchExperience(portfolioUserId),
      ]).catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolioUserId]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          {profile?.profileImage && (
            <div className="hero-image">
              <img src={profile.profileImage} alt={profile.firstName} className="profile-photo" />
            </div>
          )}
          <h1>Hello, I'm {profile?.firstName || 'a Computer Science'}</h1>
          <p className="subtitle">{profile?.title || 'Student & Developer'}</p>
          <p className="bio">{profile?.bio || 'Passionate about building amazing web applications'}</p>
          <div className="hero-links">
            {profile?.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            )}
            {profile?.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
            {profile?.twitter && (
              <a href={profile.twitter} target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {projects && projects.length > 0 && (
        <section className="projects-section">
          <div className="section-container">
            <h2>Featured Projects</h2>
            <div className="projects-grid">
              {projects.slice(0, 6).map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills && skills.length > 0 && (
        <section className="skills-section">
          <div className="section-container">
            <h2>Skills & Technologies</h2>
            <div className="skills-categories">
              {['Frontend', 'Backend', 'Tools', 'Database', 'Other'].map((category) => {
                const categorySkills = skills.filter((s) => s.category === category);
                return categorySkills.length > 0 ? (
                  <div key={category} className="skill-category-group">
                    <h3>{category}</h3>
                    <div className="skills-grid">
                      {categorySkills.map((skill) => (
                        <SkillCard key={skill._id} skill={skill} />
                      ))}
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {experience && experience.length > 0 && (
        <section className="experience-section">
          <div className="section-container">
            <h2>Experience</h2>
            <div className="experience-list">
              {experience.map((exp) => (
                <ExperienceCard key={exp._id} experience={exp} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
