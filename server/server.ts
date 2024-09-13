import express from "express";
import dotenv from "dotenv";
import routes from "./routers/baseRouter";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const port = 5000;

dotenv.config();

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

if (!spotify_client_id || !spotify_client_secret) {
  throw new Error(`Cannot read Spotify creds from ENV`);
}

export const creds = {
  spotify_client_id,
  spotify_client_secret,
};

var app = express();

app.use(`/api`, routes);

// Check that server is running
app.use(`/healthcheck`, (_, res) => {
  res.json({ status: StatusCodes.OK, message: ReasonPhrases.OK });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
