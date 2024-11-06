import axios from 'axios';
import { TrackCard } from './models/TrackCard';
import { UserInfo } from './models/UserInfo';
import { UserStats } from './models/UserStats';

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

export async function getUserInfo (): Promise<UserInfo> {
    const { data } = await axios({
        method: 'get',
        url: '/auth/getUserInfo'
    });

    return data;
}

export async function updateStats (email: string, stats: UserStats): Promise<void> {
    await axios({
        method: 'get',
        url: '/userstats/updateStats',
        params: {
            email: email,
            mistakes: stats.mistakes,
            time: stats.time,
            score: stats.score  
        }
    })
}

export async function getUserStats (email: string): Promise<UserStats> {
    const { data } = await axios({
        method: 'get',
        url: '/userstats/getUserStats',
        params: {
            email
        } 
    });

    return data as UserStats;
}