import { getAuthToken, getUserInfo } from '../api';

/**
 * Get the user authorization token
 * @returns string
 */
export const getToken = async () => {
    const response = await getAuthToken();
    return (response as { access_token: string}).access_token;
}

/**
 * Gets user info from Spotify
 * @returns User
 */
export const getUser = async () => {
    const userInfo = await getUserInfo();
    return userInfo;
}