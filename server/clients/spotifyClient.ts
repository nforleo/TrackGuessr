import axios from "axios";
import { creds } from "../server";

const instance = axios.create({
  baseURL: `https://accounts.spotify.com`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use((req) => {
  req.headers.Authorization = `Basic ${Buffer.from(creds.spotify_client_id + ":" + creds.spotify_client_secret)}`;
  return req;
});

export default instance;
