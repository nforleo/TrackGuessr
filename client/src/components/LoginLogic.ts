import { getAuthToken, getUserInfo } from '../api';
import { User } from '../models/User';

export const getToken = async (setUser: (u: User) => void) => {
    const response = await getAuthToken();
    setUser({
        token: (response as { access_token: string}).access_token || '',
        email: '',
        name: ''
    });
}

export const getUser = async (setUser: (u: User) => void, user: User | null) => {
    const userInfo = await getUserInfo();
    console.log('user info:', userInfo);
    if (user) {
        setUser({
            ...user,
            // email: userInfo.email
        });
    }
}