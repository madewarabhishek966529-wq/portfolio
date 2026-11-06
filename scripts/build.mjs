/**
 * Production Static Build Runner
 * Builds and bundles the portfolio for static hosting (Vercel, Netlify, GitHub Pages).
 */

import { build } from 'vite';

async function runBuild() {
  console.log('⚡ Starting static build for Abhishek Madewar Portfolio...');
  try {
    await build({
      configFile: './vite.config.js',
    });
    console.log('✓ Build successfully produced in ./dist');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

runBuild();

