/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'library-wp': 'linear-gradient(90deg, #0000007a, #00000067), url("/img/library-wp.jpg")',
      },
      colors: {
        // mainBg: '#054d2e',
        // mainFg: '#fff',
        // mainBg: '#06603A', lighter green
        // mainBg: '#F8F8F8',
        // mainFg: '#0084b3',
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: '#054d2e',
          'primary-focus': '#033922',
          'primary-content': '#ffffff',
          secondary: '#33d17a',
          'secondary-focus': '#2ec27e',
          'secondary-content': '#ffffff',
          accent: '#37cdbe',
          'accent-focus': '#2ba69a',
          'accent-content': '#ffffff',
          neutral: '#0B0C0D',
          'neutral-focus': '#2a2e37',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#ced3d9',
          'base-content': '#1e2734',
          info: '#1c92f2',
          success: '#009485',
          warning: '#f5c211',
          error: '#FF0000',
          '--rounded-box': '1rem',
          '--rounded-btn': '.5rem',
          '--rounded-badge': '1.9rem',
          '--animation-btn': '.25s',
          '--animation-input': '.2s',
          '--btn-text-case': 'capitalize',
          '--navbar-padding': '.5rem',
          '--border-btn': '2px',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}
