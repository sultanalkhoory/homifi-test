module.exports = {
content: [
'./app/**/*.{js,ts,jsx,tsx}',
'./components/**/*.{js,ts,jsx,tsx}',
],
theme: {
extend: {
fontFamily: {
sans: ['ui-sans-serif', 'system-ui', 'Helvetica Neue', 'Arial', 'sans-serif'],
},
colors: {
foreground: 'var(--foreground)',
background: 'var(--background)',
},
boxShadow: {
'iphone': '0 10px 30px rgba(0,0,0,0.25)',
},
},
},
plugins: [],
};
