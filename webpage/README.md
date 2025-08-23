# Emirates Visualisation Project - Technical Documentation

## Overview
This project is a comprehensive Emirates Airlines booking system replica featuring integrated 3D cabin visualisation. Built with modern web standards, it demonstrates how product visualisation can enhance the airline booking experience.

## Project Structure

```
webpage/
├── index.html          # Landing page with project overview
├── booking.html        # Interactive booking interface
├── dissertation.html   # Academic documentation
├── confirmation.html   # Booking confirmation page
├── submission.html     # Form submission success page
├── styles.css         # Consolidated stylesheet with modern CSS
├── script.js          # Modular JavaScript with ES6+ features
├── package.json       # Project metadata and dependencies
├── assets/           # Static assets (images, SVGs, etc.)
└── README.md         # This documentation file
```

## Key Features

### 🎯 Modern Development Practices
- **CSS Custom Properties**: Centralised design tokens for consistent theming
- **Modular JavaScript**: Class-based architecture with proper error handling
- **Responsive Design**: Mobile-first approach with flexible layouts
- **Accessibility**: WCAG 2.1 compliant with proper ARIA labels and focus management
- **Performance**: Optimised loading with defer attributes and resource hints

### 🛫 Booking System
- Interactive seat selection with real-time availability
- Multi-passenger support with dynamic form generation
- 360° cabin visualisation using Photo Sphere Viewer
- Responsive seating map for various screen sizes

### 🎨 Design System
- Consistent Emirates brand colours and typography
- Utility-first CSS classes for rapid development
- Modern button and form styling with proper touch targets
- Smooth animations and micro-interactions

## Technical Implementation

### CSS Architecture
```css
:root {
  /* Design tokens for consistent theming */
  --emirates-red: #d71921;
  --emirates-dark: #333;
  --spacing-md: 1rem;
  /* ... more variables */
}

/* Utility classes for common patterns */
.flex-centre { /* ... */ }
.btn { /* ... */ }
.sr-only { /* ... */ }
```

### JavaScript Modules
```javascript
// Modal management system
class ModalManager {
  constructor() { this.initialiseModals(); }
  // ...
}

// Tab navigation system
class TabManager {
  openTab(evt, tabName) { /* ... */ }
  // ...
}

// Passenger management
class PassengerManager {
  addNewPassenger(container) { /* ... */ }
  // ...
}

// Seat availability system
class SeatManager {
  updateUnavailableSeats() { /* ... */ }
  // ...
}
```

## Performance Optimisations

### 🚀 Loading Strategy
- **Deferred JavaScript**: Scripts load after HTML parsing
- **Resource Hints**: Preconnect to external domains
- **Font Loading**: Optimised with font-display: swap
- **Image Optimisation**: Responsive images with proper alt text

### 📱 Responsive Design
- **Breakpoints**: Mobile-first responsive design
- **Flexible Images**: Responsive images with max-width constraints
- **Touch Targets**: 44px minimum touch target size
- **Viewport Optimisation**: Proper meta viewport configuration

## Accessibility Features

### ♿ WCAG 2.1 Compliance
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Comprehensive ARIA labels
- **Focus Management**: Visible focus indicators
- **Colour Contrast**: Adequate contrast ratios

### 🔧 Interactive Elements
- **Modal Management**: Proper focus trapping and backdrop clicks
- **Form Validation**: Clear error states and feedback
- **Button States**: Hover, focus, and active states
- **Loading States**: Proper feedback for async operations

## Browser Support

### ✅ Supported Browsers
- **Chrome**: 88+ (latest 2 versions)
- **Firefox**: 85+ (latest 2 versions)
- **Safari**: 14+ (latest 2 versions)
- **Edge**: 88+ (latest 2 versions)

### 📱 Mobile Support
- **iOS Safari**: 14+
- **Chrome Mobile**: 88+
- **Samsung Internet**: 12+

## Development Guidelines

### 🎨 CSS Best Practices
```css
/* Use custom properties for consistency */
.component {
  colour: var(--emirates-dark);
  padding: var(--spacing-md);
}

/* Mobile-first responsive design */
.component {
  /* Mobile styles */
}

@media (min-width: 768px) {
  .component {
    /* Tablet styles */
  }
}

@media (min-width: 1024px) {
  .component {
    /* Desktop styles */
  }
}
```

### 🔧 JavaScript Patterns
```javascript
// Use classes for better organisation
class ComponentManager {
  constructor() {
    this.initialise();
  }

  initialise() {
    try {
      // Safe initialisation with error handling
      this.bindEvents();
    } catch (error) {
      console.warn('Component not found:', error.message);
    }
  }

  bindEvents() {
    // Event delegation for better performance
    document.addEventListener('click', this.handleClick.bind(this));
  }
}
```

## Deployment

### 🚀 Production Checklist
- [ ] Minify CSS and JavaScript
- [ ] Optimise images (WebP format where supported)
- [ ] Enable GZIP compression
- [ ] Set up proper caching headers
- [ ] Test on various devices and browsers
- [ ] Run accessibility audit
- [ ] Validate HTML and CSS
- [ ] Test form submissions

### 📊 Performance Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **First Input Delay**: < 100ms
- **Cumulative Layout Shift**: < 0.1

### 🛠️ Technical Debt
1. **Legacy CSS**: Remove remaining hardcoded values
2. **JavaScript**: Convert remaining functions to ES6 classes
3. **Accessibility**: Add more comprehensive ARIA patterns
4. **Documentation**: Add JSDoc comments for all functions

## Licence

© 2025 The Emirates Group. All Rights Reserved.
Project developed by Cameron Carlyon for academic purposes.

---

*This documentation is maintained as part of the project. Please direct your questions or queries to chat@cameroncarlyon.com*
