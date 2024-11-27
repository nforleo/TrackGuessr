/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import * as api from '../src/api';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Gameboard } from '../src/components/Gameplay/Gameboard';
import { UserStats } from '../src/models/UserStats';
import { User } from '../src/models/User';
import { EndSplashScreen } from '../src/components/EndSplashScreen';
import { Stats } from '../src/components/Stats/Stats';


describe("Verify custom game functionality", () => {
    // UT-27: A Custom game with a user defined number of songs (5) is started
    test('Verify a custom game can be created using the user defined number of songs', async () => {
        jest.spyOn(api, "getCustomTracks").mockResolvedValue([
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
            }
        ]);

        render(<MemoryRouter>
            <Gameboard mode='custom' />
        </MemoryRouter>);

        // In Modal, select 5 songs (decrease number by 5 since it defaults to 10)
        const minusButton = await screen.findByText('-');
        for (let i = 0; i < 5; i++) {
            fireEvent.click(minusButton);
        }

        // Make sure the number is 5
        expect(await screen.findByText(/Selected Number: 5/i)).toBeInTheDocument();

        // Start the game
        const continueButton = await screen.findByText(/continue/i);
        expect(continueButton).toBeInTheDocument();
        fireEvent.click(continueButton);

        // Started game should have 5 songs
        expect(await screen.findByText(/songs remaining: 5/i)).toBeInTheDocument();
    });

    // UT-28: Ensure a custom game ends correctly and does save stats to DB
    test('Verify that a custom game ends correctly without updating the DB', async () => {
        const stats: UserStats = {
            score: 10,
            time: 10,
            mistakes: 10
        };

        const user: User = {
            token: 'a',
            email: 'custom@mail.com',
            name: 'b'
        }

        const updateStats = jest.fn();
        const getUserStats = jest.fn().mockResolvedValue({
            ...stats
        });
        const mode = 'custom';

        // Mock the end of a custom game
        render(<MemoryRouter>
                <EndSplashScreen 
                    user={user} 
                    stats={stats} 
                    updateStats={updateStats}
                    mode={mode}/>
        </MemoryRouter>);

        // Load the stats screen 
        render(
            <MemoryRouter>
                <Stats 
                    user={user} 
                    getUserStats={getUserStats} 
                />
            </MemoryRouter>
        );

        // Make sure that the user has no stats saved after completing custom game
        expect(await screen.findByText('Please complete a daily game to see stats!')).toBeInTheDocument();
    });
});