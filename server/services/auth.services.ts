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

export const authorize = (): string => {
  const scope = "streaming user-read-email user-read-private";

  const state = generateRandomString(16);

  const auth_query_parameters = new URLSearchParams({
    response_type: "code",
    // client_id: spotify_client_id,
    client_id: "76f6ea062e5f4ac897b0e25269ee3bc4",
    scope: scope,
    redirect_uri: "http://localhost:3000/auth/callback",
    state: state,
  });

  return (
    "https://accounts.spotify.com/authorize/?" +
    auth_query_parameters.toString()
  );
};
