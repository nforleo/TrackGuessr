/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import { Gameboard } from '../src/components/Gameplay/Gameboard';
import { act, render, screen, waitFor } from '@testing-library/react';
import * as api from '../src/api';

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
       expect(await screen.findByText('Songs Remaining: 10'));
    });
});