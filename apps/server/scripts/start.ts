import { execSync } from 'child_process';

async function start() {
  try {
    // Wait for database
    await import('./wait-for-db.js');

    // Generate migrations
    console.log('Generating migrations...');
    execSync('npx drizzle-kit generate', { stdio: 'inherit' });

    // Push migrations
    console.log('Pushing migrations...');
    execSync('npx drizzle-kit migrate', { stdio: 'inherit' });

    // Start the server
    console.log('Starting server...');
    execSync('tsx watch src/index.ts', { stdio: 'inherit' });
  } catch (error) {
    console.error('Error during startup:', error);
    process.exit(1);
  }
}

start();
