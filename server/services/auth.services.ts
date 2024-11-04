import qs from "qs";
import { spotify_client_id, spotify_client_secret } from "../server";
import axios from "axios";
import { AccessToken } from "../models/AccessToken";

let accessToken: AccessToken;
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
    show_dialog: 'true'
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
    return;
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
export const token = (): AccessToken => {
  return accessToken;
};

export const logout = (): void => {
  accessToken = {} as AccessToken;
  return;
}

export const getUserInfo = async (): Promise<unknown> => {
  if (!accessToken.access_token) {
    throw new Error(`No user token defined`);
  }

  const { data } = await axios.get('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${accessToken.access_token}`
    }
  });

  return data;
}