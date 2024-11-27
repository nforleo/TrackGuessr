/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import Home from '../src/components/Home/Home';
import { cleanup, screen, render, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';
import { Gameboard } from '../src/components/Gameplay/Gameboard';
import { Stats } from '../src/components/Stats/Stats';
import * as api from '../src/api';
import { act } from 'react';
import { UserStats } from '../src/models/UserStats';
import { User } from '../src/models/User';

afterAll(cleanup);

jest.mock('axios');

describe('Check that Home screen is rendered correctly', () => {
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
            }
        ]);
    /**
     * Test that the Daily Button loads correctly on the
     *  Home Screen
     */
    test('renders a button with the text "Daily"', () => {
        const setUser = jest.fn();
        render(<MemoryRouter><Home setUser={setUser} /></MemoryRouter>);
        const dailyButton = screen.getByText('Daily');
        expect(dailyButton).toBeInTheDocument();
    });

    /**
     * Test that the Custom Button loads correctly on the
     *  Home Screen
     */
    test('renders a button with the text "Custom"', () => {
        const setUser = jest.fn();
        render(<MemoryRouter><Home setUser={setUser} /></MemoryRouter>);
        const customButton = screen.getByText('Custom');
        expect(customButton).toBeInTheDocument();
    });

    /**
     * Test that the Stats Button loads correctly on the
     *  Home Screen
     */
    test('renders a button with the text "Stats"', () => {
        const setUser = jest.fn();
        render(<MemoryRouter><Home setUser={setUser} /></MemoryRouter>);
        const statsButton = screen.getByText('Stats');
        expect(statsButton).toBeInTheDocument();
    });

    /**
     * Test that the Log Out Button loads correctly on the
     *  Home Screen
     */
    test('renders a button with the text "Log Out"', () => {
        const setUser = jest.fn();
        render(<MemoryRouter><Home setUser={setUser} /></MemoryRouter>);
        const logOutButton = screen.getByText('Log Out');
        expect(logOutButton).toBeInTheDocument();
    });
});


describe("Verify Home screen button functions", () => {
    test("The daily gameboard is rendered", async () => {
        const setUser = jest.fn();
        act(() => {
            render(<MemoryRouter>
                <Routes>
                    <Route path="" element={<Home setUser={setUser} />} />
                    <Route path="/daily" element={<Gameboard mode='daily' />} />
                </Routes>
            </MemoryRouter>);
        })

        act(() => {
            // Simulate a click on the Link in Home
            const linkElement = screen.getByRole('link', { name: /Daily/i });
            userEvent.click(linkElement);
        });
            
        // Verify if the target page is loaded by checking for the specific element
        const targetDiv = await screen.findByTestId('gameboard-daily');
        expect(targetDiv).toBeInTheDocument();
    });

    test("The custom gameboard is rendered", async () => {
        const setUser = jest.fn();

        act(() => {
            render(<MemoryRouter>
                <Routes>
                    <Route path="" element={<Home setUser={setUser} />} />
                    <Route path="/custom" element={<Gameboard mode='custom' />} />
                </Routes>
            </MemoryRouter>);
        });

        act(() => {
            // Simulate a click on the Link in Home
            const linkElement = screen.getByRole('link', { name: /Custom/i });
            userEvent.click(linkElement);
        });

        // Verify if the target page is loaded by checking for the specific element
        const targetDiv = await screen.findByTestId('gameboard-custom');
        expect(targetDiv).toBeInTheDocument();
    });

    test("The stats screen is rendered", async () => {
        const setUser = jest.fn();
         const stats: UserStats = {
            score: 10,
            time: 10,
            mistakes: 10
        };

        const getUserStats = jest.fn().mockResolvedValue({
            ...stats
        });

        const user: User = {
            token: 'a',
            email: 'custom@mail.com',
            name: 'b'
        }
        render(<MemoryRouter>
                <Routes>
                    <Route path="" element={<Home setUser={setUser} />} />
                    <Route path="/stats" element={<Stats user={user} getUserStats={getUserStats}/>} />
                </Routes>
            </MemoryRouter>);

        // Simulate a click on the Link in Home
        const linkElement = screen.getByRole('link', { name: /Stats/i });
        userEvent.click(linkElement);

        // Verify if the target page is loaded by checking for the specific element
        const targetDiv = await screen.findByTestId('stats-time');
        expect(targetDiv).toBeInTheDocument();
    });
});