import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { usePortfolio } from '../hooks/usePortfolio';
import ProjectCard from '../components/ProjectCard';
import SkillCard from '../components/SkillCard';
import ExperienceCard from '../components/ExperienceCard';
import InternshipCard from '../components/InternshipCard';
import CertificateCard from '../components/CertificateCard';
import OtherCard from '../components/OtherCard';
import CourseCard from '../components/CourseCard';
import RecommendationCard from '../components/RecommendationCard';
import ServiceCard from '../components/ServiceCard';
import CareerBreakCard from '../components/CareerBreakCard';
import EventCard from '../components/EventCard';
import SocialMediaSection from '../components/SocialMediaSection';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Home.css';

const Home = () => {
  const { profile, projects, skills, experience, internships, certificates, others, courses, recommendations, services, careerBreaks, events, loading, fetchProfile, fetchProjects, fetchSkills, fetchExperience, fetchInternships, fetchCertificates, fetchOthers, fetchCourses, fetchRecommendations, fetchServices, fetchCareerBreaks, fetchEvents } = usePortfolio();
  const [portfolioUserId, setPortfolioUserId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
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
        fetchInternships(portfolioUserId),
        fetchCertificates(portfolioUserId),
        fetchOthers(portfolioUserId),
        fetchCourses(portfolioUserId),
        fetchRecommendations(portfolioUserId),
        fetchServices(portfolioUserId),
        fetchCareerBreaks(portfolioUserId),
        fetchEvents(portfolioUserId),
      ]).catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolioUserId, refreshTrigger]);

  // Refetch data when returning to home page from admin portal
  useEffect(() => {
    const handleFocus = () => {
      if (portfolioUserId) {
        // Trigger a refresh
        setRefreshTrigger(prev => prev + 1);
      }
    };

    // Also listen for custom refresh event from AdminPortal
    const handleCustomRefresh = () => {
      if (portfolioUserId) {
        setRefreshTrigger(prev => prev + 1);
      }
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('portfolio-updated', handleCustomRefresh);
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('portfolio-updated', handleCustomRefresh);
    };
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
          <h1>{profile?.firstName} {profile?.lastName}</h1>
          <p className="bio">{profile?.bio || 'Passionate about building amazing web applications'}</p>
          
          {/* Additional Profile Info */}
          <div className="profile-info">
            {profile?.location && (
              <p className="info-item">
                <span className="info-label">📍 Location:</span> {profile.location}
              </p>
            )}
            {profile?.email && (
              <p className="info-item">
                <span className="info-label">📧 Email:</span> <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </p>
            )}
            {profile?.phone && (
              <p className="info-item">
                <span className="info-label">📱 Phone:</span> {profile.phone}
              </p>
            )}
          </div>

        </div>
      </section>

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

      {/* Internships Section */}
      {internships && internships.length > 0 && (
        <section className="experience-section">
          <div className="section-container">
            <h2>Internships</h2>
            <div className="experience-list">
              {internships.map((intn) => (
                <InternshipCard key={intn._id} internship={intn} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certificates Section */}
      {certificates && certificates.length > 0 && (
        <section className="experience-section">
          <div className="section-container">
            <h2>Certificates</h2>
            <div className="experience-list">
              {certificates.map((cert) => (
                <CertificateCard key={cert._id} certificate={cert} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Courses Section */}
      {courses && courses.length > 0 && (
        <section className="experience-section">
          <div className="section-container">
            <h2>Courses</h2>
            <div className="experience-list">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Additional Section (Others) */}
      {others && others.length > 0 && (
        <section className="experience-section">
          <div className="section-container">
            <h2>Additional</h2>
            <div className="experience-list">
              {others.map((it) => (
                <OtherCard key={it._id} item={it} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services Section (Secondary) */}
      {services && services.length > 0 && (
        <section className="experience-section">
          <div className="section-container">
            <h2>Services</h2>
            <div className="experience-list">
              {services.map((svc) => (
                <ServiceCard key={svc._id} service={svc} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recommendations Section (Secondary) */}
      {recommendations && recommendations.length > 0 && (
        <section className="experience-section">
          <div className="section-container">
            <h2>Recommendations</h2>
            <div className="experience-list">
              {recommendations.map((rec) => (
                <RecommendationCard key={rec._id} recommendation={rec} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Events Section (Secondary) */}
      {events && events.length > 0 && (
        <section className="experience-section">
          <div className="section-container">
            <h2>Events</h2>
            <div className="experience-list">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Career Breaks Section (Secondary) */}
      {careerBreaks && careerBreaks.length > 0 && (
        <section className="experience-section">
          <div className="section-container">
            <h2>Career Breaks</h2>
            <div className="experience-list">
              {careerBreaks.map((brk) => (
                <CareerBreakCard key={brk._id} careerBreak={brk} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Social Media Section */}
      <SocialMediaSection />
    </div>
  );
};

export default Home;
