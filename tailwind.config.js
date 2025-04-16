// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4B0055',      
        accent: '#C2185B',       
        background: '#F4F6F8',   
        textDark: '#1F2937',     
        buttonHover: '#9C27B0',  
      },
      fontFamily: {
        sans: ['Lato', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
};
