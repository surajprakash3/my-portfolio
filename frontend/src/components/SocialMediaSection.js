import React, { useEffect, useState } from 'react';
import '../styles/SocialMediaSection.css';
import SocialIcon from './SocialIcon';

const SocialMediaSection = () => {
  const [socialMediaData, setSocialMediaData] = useState({
    professional: [],
    nonProfessional: [],
    website: [],
    other: [],
  });
  const [loading, setLoading] = useState(true);

  // Get userId from portfolio context or localStorage
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetchSocialMediaData();
    }
  }, [userId]);

  const fetchSocialMediaData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/socialmedia/user/${userId}`);
      if (response.ok) {
        const links = await response.json();
        
        // Group links by category
        const groupedData = {
          professional: [],
          nonProfessional: [],
          website: [],
          other: [],
        };

        links.forEach((link) => {
          if (link.isVisible !== false) {
            groupedData[link.category].push(link);
          }
        });

        setSocialMediaData(groupedData);
      }
    } catch (error) {
      console.error('Error fetching social media data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderCategory = (categoryKey, categoryLabel) => {
    const links = socialMediaData[categoryKey];
    
    if (links.length === 0) return null;

    return (
      <div key={categoryKey} className="social-category">
        <h3 className="social-category-title">{categoryLabel}</h3>
        <div className="social-links-grid">
          {links.map((link) => (
            <SocialIcon key={link._id} link={link} />
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <section className="social-media-section">
        <div className="social-container">
          <p className="loading-text">Loading social media links...</p>
        </div>
      </section>
    );
  }

  const hasAnyLinks = Object.values(socialMediaData).some(arr => arr.length > 0);

  if (!hasAnyLinks) {
    return null; // Don't show section if no links
  }

  return (
    <section className="social-media-section">
      <div className="social-container">
        <div className="social-header">
          <h2 className="social-title">Connect With Me</h2>
          <p className="social-subtitle">Find me across various platforms</p>
        </div>

        <div className="social-categories">
          {renderCategory('professional', '💼 Professional')}
          {renderCategory('nonProfessional', '🎨 Social Media')}
          {renderCategory('website', '🌐 Website')}
          {renderCategory('other', '⭐ Portfolio & Design')}
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSection;

