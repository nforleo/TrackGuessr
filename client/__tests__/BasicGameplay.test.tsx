/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import { Gameboard } from '../src/components/Gameplay/Gameboard';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as api from '../src/api';
import React, { Dispatch, SetStateAction } from 'react';
import { TrackCard } from '../src/models/TrackCard';

describe('The Game should handle all cards existing in different states', () => {

    // beforeAll(() => {
    //     Object.defineProperty(window, 'location', {
    //         value: {
    //             onSpotifyWebPlaybackSDKReady: jest.fn(),
    //         },
    //         writable: true
    //     });
    // });

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

    test('should be a Start Song button', async () => {
        // Mock the useState hooks called when Play Song button is clicked
        // const setRevealedList = jest.fn() as jest.MockedFunction<Dispatch<unknown>>;
        // const setCurrentSong = jest.fn() as jest.MockedFunction<Dispatch<unknown>>;
        // const setUnrevealedCardInList = jest.fn()as jest.MockedFunction<Dispatch<unknown>>;
        const playSong = jest.fn() as jest.MockedFunction<Dispatch<unknown>>;
        const setCurrentSong = jest.fn() as jest.MockedFunction<Dispatch<unknown>>;



        let init: unknown;

        jest.spyOn(document, 'getElementById');

        jest.spyOn(React, 'useState')
            .mockImplementationOnce(() => [init, playSong]) 
        //     .mockImplementationOnce(() => [init, setCurrentSong])
        //     .mockImplementationOnce(() => [init, setUnrevealedCardInList])


        act(() => {
            render(<MemoryRouter>
                <Gameboard mode='daily' />
            </MemoryRouter>);
        })
        

        const startButton =  await screen.findByText('Start Song');

        fireEvent.click(startButton);
        expect(startButton).toBeInTheDocument();
    });
});

