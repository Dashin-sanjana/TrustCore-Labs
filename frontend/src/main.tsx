import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import './styles.css';
import './home-v4.css';
import './footer-v2.css';
import './brand-theme.css';

const root = document.getElementById('root')!;
const app = <React.StrictMode><App /></React.StrictMode>;

if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
