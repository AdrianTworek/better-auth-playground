import pg from 'pg';

const MAX_RETRIES = 30;
const RETRY_DELAY = 1000;

async function waitForDb() {
  const client = new pg.Client(process.env.DATABASE_URL);
  let retries = MAX_RETRIES;

  while (retries > 0) {
    try {
      await client.connect();
      console.log('Database is ready!');
      await client.end();
      return;
    } catch {
      console.log(`Waiting for database... (${retries} attempts remaining)`);
      retries--;
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }
  }

  throw new Error('Unable to connect to database');
}

waitForDb();
