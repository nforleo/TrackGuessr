import axios from 'axios';
import { TrackCard } from './models/TrackCard';

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

export async function getDailyTracks (): Promise<TrackCard[]> {
    const { data } = await axios({
        method: 'get',
        url: '/game/daily'
    });

    return data as TrackCard[];
}

export async function playSong (uri: string): Promise<void> {
    await axios({
        method: 'put',
        url: '/game/playSong',
        params: {
            uri
        }
    });
}

export async function getUserInfo (): Promise<unknown> {
    const { data } = await axios({
        method: 'get',
        url: '/auth/getUserInfo'
    });

    return data;
}