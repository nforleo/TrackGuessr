import axios from 'axios';

// const baseURL = 'http://localhost:5000/api'

export async function getAuthToken(): Promise<{ access_token: string}> {
    const { data } = await axios({
        method: 'get',
        url: `/auth/token`
    });

    return data;
}

export async function logout(): Promise<void> {
    await axios({
        method: 'post',
        url: '/auth/logout'
    });
}