import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles.css';
import './home-v4.css';
import './footer-v2.css';

function installTightFavicon() {
  const image = new Image();

  image.addEventListener('load', () => {
    const source = document.createElement('canvas');
    const sourceContext = source.getContext('2d', { willReadFrequently: true });

    if (!sourceContext) return;

    source.width = image.naturalWidth;
    source.height = image.naturalHeight;
    sourceContext.drawImage(image, 0, 0);

    const pixels = sourceContext.getImageData(0, 0, source.width, source.height).data;
    let left = source.width;
    let top = source.height;
    let right = 0;
    let bottom = 0;

    for (let y = 0; y < source.height; y += 1) {
      for (let x = 0; x < source.width; x += 1) {
        if (pixels[(y * source.width + x) * 4 + 3] > 20) {
          left = Math.min(left, x);
          top = Math.min(top, y);
          right = Math.max(right, x);
          bottom = Math.max(bottom, y);
        }
      }
    }

    if (right <= left || bottom <= top) return;

    const output = document.createElement('canvas');
    const outputContext = output.getContext('2d');
    const size = 96;
    const padding = 4;
    const sourceWidth = right - left + 1;
    const sourceHeight = bottom - top + 1;
    const scale = Math.min((size - padding * 2) / sourceWidth, (size - padding * 2) / sourceHeight);
    const width = sourceWidth * scale;
    const height = sourceHeight * scale;

    if (!outputContext) return;

    output.width = size;
    output.height = size;
    outputContext.imageSmoothingEnabled = true;
    outputContext.imageSmoothingQuality = 'high';
    outputContext.drawImage(
      source,
      left,
      top,
      sourceWidth,
      sourceHeight,
      (size - width) / 2,
      (size - height) / 2,
      width,
      height,
    );

    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (favicon) favicon.href = output.toDataURL('image/png');
  });

  image.src = '/faviconl.png';
}

installTightFavicon();

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
