import express from "express";
import dotenv from "dotenv";
import authRouter from "./routers/authRouter";
import gameRouter from './routers/gameRouter';
import databaseRouter from './routers/databaseRouter';

const port = 5000;

dotenv.config();

// Get client/secret for spotify app
export const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
export const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

if (!spotify_client_id || !spotify_client_secret) {
  throw new Error(`Cannot read Spotify creds from ENV`);
}

// Route requests through router
const app = express();
app.use('/auth', authRouter);
app.use('/game', gameRouter);
app.use('/userstats', databaseRouter);


/**
 * Listen to defined port 
 */
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
  });
}
