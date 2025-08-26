/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        screens: {
          'xsm': {'max': '500px'},
          'smxs': {'max': '400px'},
          'xxsm': {'max': '320px'},
        },
        colors: {
          // This defines the main brand color that can be used as 'bg-primary', 'text-primary' etc.
          primary: "#21B546", // Main brand color - vibrant green
          
          // Secondary colors are variations/shades of the primary color
          // The numbers represent different shades (100 being lightest, 900 being darkest)
          // Can be used like 'bg-secondary-100', 'text-secondary-600' etc.
          secondary: {
            100: "#C2F2CE", // Very light shade - accent green
            200: "#8CCFAD", // Light accent green
            300: "#1AC946", // Medium accent green
            400: "#28BF4E", // Medium green
            500: "#21B546", // Same as primary color
            600: "#1A8F38", // Darker green
            700: "#136A2A", // Dark green
            800: "#0C451C", // Very dark green
            900: "#05200E", // Darkest green
          },
          
          // Accent colors are supporting colors for highlighting or contrasting elements
          // Can be used like 'bg-accent-blue', 'text-accent-green' etc.
          accent: {
            blue: "#1D67C9",   // For links, buttons etc
            green: "#21B546",  // For success states - using primary green
            yellow: "#FBBF24", // For warnings
            purple: "#8B5CF6", // For special highlights
          },
          dark: {
            50: "#F9FAFB",   // Use with bg-dark-50 for subtle backgrounds, text-dark-50 for very light text
            100: "#F3F4F6",  // Use with bg-dark-100 for hover states, text-dark-100 for light text
            200: "#E5E7EB",  // Use with border-dark-200 for borders, bg-dark-200 for light backgrounds
            300: "#D1D5DB",  // Use with text-dark-300 for secondary text, border-dark-300 for stronger borders
            400: "#9CA3AF",  // Use with text-dark-400 for placeholder text, bg-dark-400 for medium backgrounds
            500: "#6B7280",  // Use with text-dark-500 for default text, bg-dark-500 for medium-dark backgrounds
            600: "#4B5563",  // Use with text-dark-600 for stronger text, bg-dark-600 for darker backgrounds
            700: "#374151",  // Use with text-dark-700 for headers, bg-dark-700 for very dark backgrounds
            800: "#1F2937",  // Use with text-dark-800 for high contrast text, bg-dark-800 for near-black backgrounds
            900: "#111827",  // Use with text-dark-900 for highest contrast, bg-dark-900 for darkest backgrounds
          },
          // Dark green theme colors based on the provided color codes
          theme: {
            // Primary dark backgrounds
            bgPrimary: "#011A0B",    // Main page background - very dark green
            bgSecondary: "#001509",  // Card/section backgrounds - slightly lighter dark green
            bgTertiary: "#001107",   // Alternative dark background
            cardBg: "#011A0B",       // Card background for active demands & shares to buy
            
            // Primary green and accents
            primaryGreen: "#21B546", // Main accent green
            accentLight: "#C2F2CE",  // Light accent green
            accentMedium: "#8CCFAD", // Medium accent green
            accentBright: "#1AC946", // Bright accent green
            
            // Borders and subtle elements
            borderPrimary: "#28BF4E4D", // Semi-transparent border
            borderSecondary: "#192c22", // Solid border
            
            // Text colors for dark theme
            textPrimary: "#FFFFFF",    // White text for headings and important content
            textSecondary: "#A0A0A0",  // Light grey for body text
            textMuted: "#6B7280",      // Muted text for less important content
          },
          primaryBg: "#011A0B", // Updated to dark green theme
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          heading: ['Montserrat', 'sans-serif'],
        },
        backgroundImage: {
          'hero-pattern': "url('/src/assets/images/hero-bg.jpg')",
          'cta-pattern': "url('/src/assets/images/cta-bg.jpg')",
        },
        boxShadow: {
          'custom': '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
          'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
          'dark': '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
        },
        keyframes: {
          shimmer: {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(100%)' }
          }
        },
        animation: {
          shimmer: 'shimmer 1.5s ease-in-out infinite'
        }
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
    ],
  } 