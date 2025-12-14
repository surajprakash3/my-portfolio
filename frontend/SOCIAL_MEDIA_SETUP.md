# Social Media Section Integration Guide

## Overview
A modern, categorized social media section with SVG icons, hover effects, tooltips, dark mode support, and full responsiveness.

## Features
✅ **Four Categories**: Professional, Non-Professional, Website, Other  
✅ **High-Quality SVG Icons**: Optimized for fast loading  
✅ **Interactive Hover Effects**: Smooth animations with scale and color transitions  
✅ **Tooltips**: On hover platform name display  
✅ **Dark/Light Mode**: Full theme support with CSS variables  
✅ **Responsive Design**: Adapts to all screen sizes (desktop, tablet, mobile)  
✅ **Accessibility**: Focus states and semantic HTML  
✅ **Performance Optimized**: GPU-accelerated animations  

## File Structure
```
frontend/src/
├── components/
│   ├── SocialMediaSection.js      # Main component
│   ├── SocialIcon.js               # Individual icon wrapper with tooltip
│   └── SocialIcons.js              # SVG icon definitions
├── data/
│   └── socialMediaData.js          # Social links configuration
└── styles/
    └── SocialMediaSection.css      # Styling with dark mode
```

## Installation Steps

### 1. Update Your Main App Component

Add the SocialMediaSection to your `App.js` or main page:

```jsx
import SocialMediaSection from './components/SocialMediaSection';

function App() {
  return (
    <div className="App">
      {/* Other components */}
      <SocialMediaSection />
      {/* Footer or other components */}
    </div>
  );
}
```

### 2. Customize Social Links

Edit `src/data/socialMediaData.js` to add your actual links:

```javascript
// Example: Update LinkedIn URL
professional: [
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    url: 'https://linkedin.com/in/YOUR-USERNAME',  // ← Update this
    color: '#0077B5',
    bgColor: 'rgba(0, 119, 181, 0.1)'
  },
  // ... other links
]
```

Replace placeholders with your actual usernames/URLs:
- LinkedIn: `https://linkedin.com/in/yourusername`
- GitHub: `https://github.com/yourusername`
- Instagram: `https://instagram.com/yourprofile`
- Dev.to: `https://dev.to/yourprofile`
- Medium: `https://medium.com/@yourprofile`
- LeetCode: `https://leetcode.com/yourprofile`
- X (Twitter): `https://x.com/yourprofile`
- Facebook: `https://facebook.com/yourprofile`
- YouTube: `https://youtube.com/@yourchannel`
- Behance: `https://behance.net/yourprofile`
- Dribbble: `https://dribbble.com/yourprofile`
- Kaggle: `https://kaggle.com/yourprofile`
- Blog: `/blog` (internal link)
- Company Website: `https://yourcompany.com`

### 3. Check CSS Theme Variables

Ensure your `App.css` includes these theme variables (it should from previous dark mode implementation):

**Dark Mode** (`:root` selector):
```css
--primary-color: #a855f7;
--page-bg: #050910;
--page-text: #e4e4e7;
--card-bg: rgba(255, 255, 255, 0.05);
--card-border: rgba(255, 255, 255, 0.08);
--button-text: #ffffff;
```

**Light Mode** (`[data-theme="light"]` selector):
```css
--primary-color: #9333ea;
--page-bg: #fef5ff;
--page-text: #0b0b14;
--card-bg: rgba(255, 255, 255, 0.6);
--card-border: rgba(168, 85, 247, 0.2);
--button-text: #ffffff;
```

## Customization Options

### Change Colors
In `SocialMediaSection.css`, modify the primary color gradient:

```css
.social-title {
  background: linear-gradient(135deg, var(--primary-color), #a78bfa);
}
```

### Adjust Icon Sizes
For larger/smaller icons, edit desktop size:

```css
.social-icon-link {
  width: 80px;    /* Change from 70px */
  height: 80px;   /* Change from 70px */
}

.social-icon-container {
  width: 36px;    /* Change from 32px */
  height: 36px;   /* Change from 32px */
}
```

### Modify Hover Animation
Change scale and distance:

```css
.social-icon-link:hover {
  transform: translateY(-12px) scale(1.15);  /* Adjust values */
}
```

### Add More Categories
Edit `socialMediaData.js`:

```javascript
export const socialMediaLinks = {
  professional: [...],
  nonProfessional: [...],
  website: [...],
  other: [...],
  gaming: [  // ← New category
    {
      name: 'Twitch',
      icon: 'twitch',
      url: 'https://twitch.tv/yourprofile',
      color: '#9146FF',
      bgColor: 'rgba(145, 70, 255, 0.1)'
    }
  ]
};
```

Then in `SocialMediaSection.js`:

```jsx
{renderCategory('gaming', '🎮 Gaming')}
```

## Performance Tips

1. **SVG Optimization**: All icons are inline SVG for zero HTTP requests
2. **GPU Acceleration**: Transform and opacity used (fastest animations)
3. **CSS Variables**: Reduce repaints with scoped theme colors
4. **Media Queries**: Responsive grid adapts to all screen sizes
5. **Lazy Loading**: Component only renders when needed

## Dark Mode Integration

The section automatically uses your existing dark/light mode toggle:

```jsx
// In Navbar.js, your toggle already handles:
document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
```

The CSS automatically adapts all colors:

```css
[data-theme='dark'] .social-icon-link {
  background: rgba(168, 85, 247, 0.05);
}

[data-theme='light'] .social-icon-link {
  background: rgba(168, 85, 247, 0.08);
}
```

## Mobile Responsive Behavior

| Screen Size | Icon Size | Grid Columns | Gap |
|---|---|---|---|
| Desktop (1024px+) | 70px | Auto-fit | 1rem |
| Tablet (768-1024px) | 60px | Auto-fit | 0.8rem |
| Mobile (640px) | 55px | 4 | 0.75rem |
| Small Mobile (480px) | 50px | 3 | 0.75rem |

## Accessibility Features

✅ **Keyboard Navigation**: Tab through icons, Enter to follow link  
✅ **Focus States**: Clear outline on focus  
✅ **Tooltips**: Show platform name on hover/focus  
✅ **Semantic HTML**: Proper `<a>` tags with `title` attributes  
✅ **Color Contrast**: Meets WCAG AA standards  

## Testing Checklist

- [ ] All URLs are correct and working
- [ ] Icons display properly in both themes
- [ ] Hover effects work smoothly
- [ ] Tooltips appear on all devices
- [ ] Responsive layout works on mobile
- [ ] Links open in new tabs (external) / same tab (internal)
- [ ] Dark mode toggle updates section colors
- [ ] Icons are crisp and not pixelated
- [ ] No console errors
- [ ] Keyboard navigation works

## Browser Support

✅ Chrome/Edge 90+  
✅ Firefox 88+  
✅ Safari 14+  
✅ Mobile browsers (iOS Safari, Chrome Mobile)  

## Adding More Icons

To add a new platform icon in `SocialIcons.js`:

```jsx
const icons = {
  // ... existing icons
  twitch: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      {/* SVG path */}
    </svg>
  )
};
```

Then add to `socialMediaData.js`:

```javascript
{
  name: 'Twitch',
  icon: 'twitch',
  url: 'https://twitch.tv/yourprofile',
  color: '#9146FF',
  bgColor: 'rgba(145, 70, 255, 0.1)'
}
```

## Troubleshooting

**Icons not showing?**
- Check SVG viewBox attributes
- Verify icon names match between data and icons component

**Colors not updating in light mode?**
- Ensure `[data-theme="light"]` CSS is applied
- Check App.css theme variables are set

**Tooltip not appearing?**
- Verify `.social-tooltip` CSS is loaded
- Check z-index conflicts with other elements

**Links not working?**
- Verify URLs in socialMediaData.js
- Check target="_blank" for external links

## Future Enhancements

- Add analytics tracking for link clicks
- Implement social share functionality
- Add follower counts from APIs
- Create dropdown for more links per category
- Add animation delay between category reveals
- Implement "copy link" feature for profiles
