import { getAuthToken, getUserInfo } from '../api';
import { User } from '../models/User';

export const getToken = async () => {
    const response = await getAuthToken();
    return (response as { access_token: string}).access_token;
}

export const getUser = async () => {
    const userInfo = await getUserInfo();
    return userInfo;
}