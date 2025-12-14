import React, { useState } from 'react';
import SocialIcons from './SocialIcons';

const SocialIcon = ({ link }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Support both old format (icon) and new format (iconName)
  const iconName = link.iconName || link.icon;
  const description = link.description || link.name;

  return (
    <div className="social-icon-wrapper">
      <a
        href={link.url}
        className="social-icon-link"
        title={description}
        target={link.url.startsWith('/') ? '_self' : '_blank'}
        rel={link.url.startsWith('/') ? '' : 'noopener noreferrer'}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className="social-icon-container">
          <SocialIcons iconName={iconName} />
        </div>
      </a>
      {showTooltip && <div className="social-tooltip">{link.name}</div>}
    </div>
  );
};

export default SocialIcon;

