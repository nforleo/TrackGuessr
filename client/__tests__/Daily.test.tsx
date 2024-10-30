/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import { Gameboard } from '../src/components/Gameplay/Gameboard';
import { act, render, screen, waitFor } from '@testing-library/react';
import * as api from '../src/api';
import { UserStats } from '../src/models/UserStats';
import { EndSplashScreen } from '../src/components/EndSplashScreen';

describe("Verify daily game functionality", () => {
    test('When the daily game loads, the call to the backend should leave 10 songs in the unrevealed list', async () => {
        // 11 songs, 1 for revealed and 10 for unrevealed
        jest.spyOn(api, "getDailyTracks").mockResolvedValue([
            {
                id: "track_id",
                revealed: false,
                year: 1999,
                artist: "artist_name",
                title: "track_name",
                album: "album_name",
            }, {
                id: "track_id",
                revealed: false,
                year: 1999,
                artist: "artist_name",
                title: "track_name",
                album: "album_name",
            }, {
                id: "track_id",
                revealed: false,
                year: 1999,
                artist: "artist_name",
                title: "track_name",
                album: "album_name",
            }, {
                id: "track_id",
                revealed: false,
                year: 1999,
                artist: "artist_name",
                title: "track_name",
                album: "album_name",
            }, {
                id: "track_id",
                revealed: false,
                year: 1999,
                artist: "artist_name",
                title: "track_name",
                album: "album_name",
            }, {
                id: "track_id",
                revealed: false,
                year: 1999,
                artist: "artist_name",
                title: "track_name",
                album: "album_name",
            }, {
                id: "track_id",
                revealed: false,
                year: 1999,
                artist: "artist_name",
                title: "track_name",
                album: "album_name",
            }, {
                id: "track_id",
                revealed: false,
                year: 1999,
                artist: "artist_name",
                title: "track_name",
                album: "album_name",
            }, {
                id: "track_id",
                revealed: false,
                year: 1999,
                artist: "artist_name",
                title: "track_name",
                album: "album_name",
            }, {
                id: "track_id",
                revealed: false,
                year: 1999,
                artist: "artist_name",
                title: "track_name",
                album: "album_name",
            }, {
                id: "track_id",
                revealed: false,
                year: 1999,
                artist: "artist_name",
                title: "track_name",
                album: "album_name",
            }
        ]);

        render(<MemoryRouter>
            <Gameboard mode='daily' />
        </MemoryRouter>);

       // Expect 10 songs to be in the list when the call to the backend returns 11 songs 
       expect(await screen.findByText('Songs Remaining: 10')).toBeInTheDocument();
    });

    test('The End Game Splash screen should render correctly', async () => {
        const stats: UserStats = {
            score: 2,
            mistakes: 0,
            time: 0
        };

        render(<MemoryRouter>
            <EndSplashScreen stats={stats} />
        </MemoryRouter>)


        // The score should be displayed on the End Game splash Screen
        expect(await screen.findByText('Your Score: 2')).toBeInTheDocument();
        // The placeholder for number of mistakes should be rendered
        expect(await screen.findByText('Number of Mistakes: 0')).toBeInTheDocument();
        // The placeholder for game duration should be rendered
        expect(await screen.findByText('Your Time: na')).toBeInTheDocument();
        // the Home Button should be rendered
        expect(await screen.findByText('Home')).toBeInTheDocument();
    });
});