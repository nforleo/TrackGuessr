import qs from "qs";
import { spotify_client_id, spotify_client_secret } from "../server";
import axios from "axios";

let accessToken: unknown;
const redirect_uri = 'http://localhost:3000/auth/callback';

/**
 * Recommended by Spotify documentation:
 *      https://developer.spotify.com/documentation/web-playback-sdk/howtos/web-app-player
 * @param length
 * @returns
 */
const generateRandomString = function (length: number) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

/**
 * Redirect user to the Spotify Login page
 * @returns authorization URL
 */
export const login = (): string => {
  if (!spotify_client_id) {
    throw new Error(`login error: no client id`);
  }
  const scope = "streaming user-read-email user-read-private";
  const state = generateRandomString(16);

  const auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri,
    state: state,
  });

  return (
    "https://accounts.spotify.com/authorize/?" +
    auth_query_parameters.toString()
  );
};

interface SpotifyCallbackProps {
  code: string;
}
/**
 * Get the access token from spotify for the logged in user
 * @param param0 Authroization code returned from Spotify
 * @returns nothing, but defines access code
 */
export const callback = async ({
  code,
}: SpotifyCallbackProps): Promise<unknown> => {
  if (!code) {
    throw new Error(`No code to exchange`);
  }

  const form = {
      code,
      redirect_uri,
      grant_type: `authorization_code`,
    };

  const {data} = await axios.post('https://accounts.spotify.com/api/token', qs.stringify(form), {
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64'))
    },
  });

  accessToken = data;

  return;
};

/**
 * Fetch access token that was generated
 * @returns access token
 */
export const token = (): unknown => {
  return accessToken as unknown;
};
