
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add preconnect for Google Fonts
const linkPreconnect1 = document.createElement('link');
linkPreconnect1.rel = 'preconnect';
linkPreconnect1.href = 'https://fonts.googleapis.com';
document.head.appendChild(linkPreconnect1);

const linkPreconnect2 = document.createElement('link');
linkPreconnect2.rel = 'preconnect';
linkPreconnect2.href = 'https://fonts.gstatic.com';
linkPreconnect2.crossOrigin = '';
document.head.appendChild(linkPreconnect2);

// Add Inter font
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
document.head.appendChild(fontLink);

createRoot(document.getElementById("root")!).render(<App />);
