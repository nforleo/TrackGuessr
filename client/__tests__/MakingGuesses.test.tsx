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
import { UserStats } from '../src/models/UserStats';

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

        const revealedList = [{
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

        const setRevealedList = jest.fn();
        const stats: UserStats = {
            score: 0,
            mistakes: 0,
            time: 0
        }
        const currentSong = {
            id: "track_id2",
            revealed: false,
            year: 1999,
            artist: "artist_name",
            title: "track_name",
            album: "album_name",
        };
        const setIsIncorrectGuess = jest.fn();
        const setUnrevealedCardInListMock = jest.fn();
        const setStats = jest.fn();
        const setShowAttributesModal = jest.fn();

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
            }], currentSong);
        const setCurrentSong = jest.fn();
        const setUnrevealedCardInList = jest.fn();
        const setIsFinished = jest.fn();
        const hasLoaded = true;
        const unrevealedList: TrackCard[] = [];

        logic.submitGuess(
            setRevealedList,
            currentSong,
            revealedList,
            setIsIncorrectGuess,
            setUnrevealedCardInListMock,
            setStats,
            setShowAttributesModal,
            stats
        )
        
        expect(await screen.findByText(/score/i)).toBeInTheDocument();

        

        const startSongButton = await screen.findByText(/start song/i);
        expect(startSongButton).toBeInTheDocument();
        fireEvent.click(startSongButton);

        const confirmButton = await screen.findByText(/confirm guess/i)
        expect(confirmButton).toBeInTheDocument();
        fireEvent.click(confirmButton);

        logic.resetAndRemoveWrongCard(
            revealedList, 
            currentSong, 
            setRevealedList, 
            setIsIncorrectGuess, 
            setCurrentSong,
            setUnrevealedCardInList,
            setIsFinished,
            hasLoaded,
            unrevealedList
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
        const stats: UserStats = {
            score: 0,
            mistakes: 0,
            time: 0
        }
        const mockSetIsIncorrectGuess = jest.fn();
        const mockProcessCorrectGuess = jest.fn();
        const setStats = jest.fn();
        const setShowAttributesModal = jest.fn();

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
            mockProcessCorrectGuess,
            setStats,
            setShowAttributesModal,
            stats
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