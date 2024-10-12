/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import Home from '../src/components/Home/Home';
import { cleanup, screen, render, waitFor, fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';
import { Gameboard } from '../src/components/Gameplay/Gameboard';
import { Stats } from '../src/components/Stats/Stats';
import * as api from '../src/api';
import { act, Dispatch } from 'react';
import React from 'react';
import { TrackCard } from '../src/models/TrackCard';
import * as logic from '../src/components/Gameplay/utils/logic';

afterAll(cleanup);

jest.mock('axios');

describe('Verify basic guessing functionality', () => {
    jest.spyOn(api, 'getAuthToken').mockResolvedValue({
        access_token: 'access_token'
    });

    jest.spyOn(api, 'getDailyTracks').mockResolvedValue([
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
        }
    ]);

    test('an incorrect guess is wrong', async () => {
        render(<MemoryRouter>
                <Gameboard mode='daily' />
        </MemoryRouter>);

        const badGuess = [{
            id: "track_id",
            revealed: true,
            year: 1999,
            artist: "artist_name",
            title: "track_name",
            album: "album_name",
        }, {
            id: "track_id",
            revealed: false,
            year: 1980,
            artist: "artist_name",
            title: "track_name",
            album: "album_name",
        }];

        const mockSetRevealedList = jest.fn();
        const mockCurrentSong = {
            id: "track_id2",
            revealed: false,
            year: 1999,
            artist: "artist_name",
            title: "track_name",
            album: "album_name",
        };
        const mockSetIsIncorrectGuess = jest.fn();
        const mockProcessCorrectGuess = jest.fn();

        logic.setRevealedListCallback([{
                id: "track_id1",
                revealed: true,
                year: 1999,
                artist: "artist_name",
                title: "track_name",
                album: "album_name",
            }, {
                id: "track_id2",
                revealed: false,
                year: 1980,
                artist: "artist_name",
                title: "track_name",
                album: "album_name",
            }], mockCurrentSong);
        const mockSetCurrentSong = jest.fn();
        const mockSetUnRevealedCardInList = jest.fn();

        logic.submitGuess(
            mockSetRevealedList,
            mockCurrentSong,
            badGuess,
            mockSetIsIncorrectGuess,
            mockProcessCorrectGuess
        )
        
        expect(await screen.findByText(/score/i)).toBeInTheDocument();

        

        const startSongButton = await screen.findByText(/start song/i);
        expect(startSongButton).toBeInTheDocument();
        fireEvent.click(startSongButton);

        const confirmButton = await screen.findByText(/confirm guess/i)
        expect(confirmButton).toBeInTheDocument();
        fireEvent.click(confirmButton);

        logic.resetAndRemoveWrongCard(
            badGuess, 
            mockCurrentSong, 
            mockSetRevealedList, 
            mockSetIsIncorrectGuess, 
            mockSetCurrentSong,
            mockSetUnRevealedCardInList
        )
    });

    test('an correct guess is correct', async () => {
        render(<MemoryRouter>
                <Gameboard mode='daily' />
        </MemoryRouter>);

        const mockSetRevealedList = jest.fn();
        const mockCurrentSong = {
            id: "track_id",
            revealed: false,
            year: 1999,
            artist: "artist_name",
            title: "track_name",
            album: "album_name",
        };
        const mockRevealedList = [{
            id: "track_id",
            revealed: true,
            year: 1999,
            artist: "artist_name",
            title: "track_name",
            album: "album_name",
        }, {
            id: "track_id",
            revealed: false,
            year: 2010,
            artist: "artist_name",
            title: "track_name",
            album: "album_name",
        }];
        const mockSetIsIncorrectGuess = jest.fn();
        const mockProcessCorrectGuess = jest.fn();

        logic.setRevealedListCallback([{
                id: "track_id",
                revealed: true,
                year: 1999,
                artist: "artist_name",
                title: "track_name",
                album: "album_name",
            }, {
                id: "track_id",
                revealed: false,
                year: 2010,
                artist: "artist_name",
                title: "track_name",
                album: "album_name",
            }], mockCurrentSong);

        logic.submitGuess(
            mockSetRevealedList,
            mockCurrentSong,
            mockRevealedList,
            mockSetIsIncorrectGuess,
            mockProcessCorrectGuess
        )
        
        expect(await screen.findByText(/score/i)).toBeInTheDocument();

        const startSongButton = await screen.findByText(/start song/i);
        expect(startSongButton).toBeInTheDocument();
        fireEvent.click(startSongButton);

        const confirmButton = await screen.findByText(/confirm guess/i)
        expect(confirmButton).toBeInTheDocument();
        fireEvent.click(confirmButton);
    });
});