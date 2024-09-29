/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import { Gameboard } from '../src/components/Gameplay/Gameboard';
import { act, render, screen, waitFor } from '@testing-library/react';
import * as api from '../src/api';

describe('The Gameboard shall be rendered', () => {

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
        }
    ]);

    jest.spyOn(api, 'getAuthToken').mockResolvedValue({
        access_token: 'access_token'
    });
    test('A revealed card is displayed', async () => {
        act(() => {
            render(<MemoryRouter>
                <Gameboard mode='daily' />
            </MemoryRouter>);
        })
        

        const revealedCard =  await screen.findByTestId(/track-card-revealed/i);
        expect(revealedCard).toBeInTheDocument();
    });

    test('An unrevealed card is displayed', async () => {
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
        }
    ]);

        act(() => {
            render(<MemoryRouter>
                <Gameboard mode='daily' />
            </MemoryRouter>);
        });

        const revealedCard =  await screen.findByTestId(/track-card-revealed/i);
        expect(revealedCard).toBeInTheDocument();

        const unrevealedCard =  await screen.findByTestId(/track-card-unrevealed/i);
        expect(unrevealedCard).toBeInTheDocument();
    });
});