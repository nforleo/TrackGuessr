import axios from 'axios';

// const baseURL = 'http://localhost:5000/api'

export async function getAuthToken(): Promise<unknown> {
    const { data } = await axios({
        method: 'get',
        // baseURL,
        url: `/auth/token`
    });

    return data;
}