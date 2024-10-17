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
import axios from 'axios';
import { GuessAttributesModal } from '../src/components/Gameplay/GuessAttributesModal';

jest.mock('axios');

describe('test guess attributes functionality', () => {
    test('A correct artist name guess should increment score by 1', async () => {
        const setShow = jest.fn();
        const setCurrentSong = jest.fn();
        const setStats = jest.fn();
        const currentSong = {
            id: 'mock id',
            revealed: true,
            artist: 'mock artist',
            title: 'mock title',
            year: 2000,
            album: 'mock album'
        };
        const stats = {
            score: 0,
            mistakes: 0,
            time: 'mock time'
        }
        
        
        render(<GuessAttributesModal 
            show={true}
            setShow={setShow}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            setStats={setStats}
            stats={stats}
        />)

        const artistInput: HTMLInputElement =  await screen.findByTestId('input-artist');
        fireEvent.change(artistInput, { target: {value: 'mock artist'} });
        expect(artistInput.value).toBe('mock artist');

        const submitButton = await screen.findByText('Submit');
        fireEvent.click(submitButton);

        const closeButton = await screen.findByText('Close');
        fireEvent.click(closeButton);
    });

    test('A correct track name guess should increment score by 1', async () => {
        const setShow = jest.fn();
        const setCurrentSong = jest.fn();
        const setStats = jest.fn();
        const currentSong = {
            id: 'mock id',
            revealed: true,
            artist: 'mock artist',
            title: 'mock track',
            year: 2000,
            album: 'mock album'
        };
        const stats = {
            score: 0,
            mistakes: 0,
            time: 'mock time'
        }
        
        
        render(<GuessAttributesModal 
            show={true}
            setShow={setShow}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            setStats={setStats}
            stats={stats}
        />)

        const trackInput: HTMLInputElement =  await screen.findByTestId('input-track');
        fireEvent.change(trackInput, { target: {value: 'mock track'} });
        expect(trackInput.value).toBe('mock track');

        const submitButton = await screen.findByText('Submit');
        fireEvent.click(submitButton);

        const closeButton = await screen.findByText('Close');
        fireEvent.click(closeButton);
    });

    test('A correct album name guess should increment score by 1', async () => {
        const setShow = jest.fn();
        const setCurrentSong = jest.fn();
        const setStats = jest.fn();
        const currentSong = {
            id: 'mock id',
            revealed: true,
            artist: 'mock artist',
            title: 'mock title',
            year: 2000,
            album: 'mock album'
        };
        const stats = {
            score: 0,
            mistakes: 0,
            time: 'mock time'
        }
        
        
        render(<GuessAttributesModal 
            show={true}
            setShow={setShow}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            setStats={setStats}
            stats={stats}
        />)

        const albumInput: HTMLInputElement =  await screen.findByTestId('input-album');
        fireEvent.change(albumInput, { target: {value: 'mock album'} });
        expect(albumInput.value).toBe('mock album');

        const submitButton = await screen.findByText('Submit');
        fireEvent.click(submitButton);

        const closeButton = await screen.findByText('Close');
        fireEvent.click(closeButton);
    });
});