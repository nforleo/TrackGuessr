/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import Home from '../src/components/Home/Home';
import { cleanup, screen, render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';
import { Gameboard } from '../src/components/Gameplay/Gameboard';
import { Stats } from '../src/components/Stats/Stats';

afterAll(cleanup);

describe('Check that Home screen is rendered correctly', () => {
    /**
     * Test that the Daily Button loads correctly on the
     *  Home Screen
     */
    test('renders a button with the text "Daily"', () => {
        const setToken = jest.fn();
        render(<MemoryRouter><Home setToken={setToken} /></MemoryRouter>);
        const dailyButton = screen.getByText('Daily');
        expect(dailyButton).toBeInTheDocument();
    });

    /**
     * Test that the Custom Button loads correctly on the
     *  Home Screen
     */
    test('renders a button with the text "Custom"', () => {
        const setToken = jest.fn();
        render(<MemoryRouter><Home setToken={setToken} /></MemoryRouter>);
        const customButton = screen.getByText('Custom');
        expect(customButton).toBeInTheDocument();
    });

    /**
     * Test that the Stats Button loads correctly on the
     *  Home Screen
     */
    test('renders a button with the text "Stats"', () => {
        const setToken = jest.fn();
        render(<MemoryRouter><Home setToken={setToken} /></MemoryRouter>);
        const statsButton = screen.getByText('Stats');
        expect(statsButton).toBeInTheDocument();
    });

    /**
     * Test that the Log Out Button loads correctly on the
     *  Home Screen
     */
    test('renders a button with the text "Log Out"', () => {
        const setToken = jest.fn();
        render(<MemoryRouter><Home setToken={setToken} /></MemoryRouter>);
        const logOutButton = screen.getByText('Log Out');
        expect(logOutButton).toBeInTheDocument();
    });
});


describe("Verify Home screen button functions", () => {
    test("The daily gameboard is rendered", async () => {
        const setToken = jest.fn();
        render(<MemoryRouter>
                <Routes>
                    <Route path="" element={<Home setToken={setToken} />} />
                    <Route path="/daily" element={<Gameboard mode='daily' />} />
                </Routes>
            </MemoryRouter>);

        // Simulate a click on the Link in Home
        const linkElement = screen.getByRole('link', { name: /Daily/i });
        userEvent.click(linkElement);

        // Verify if the target page is loaded by checking for the specific element
        const targetDiv = await screen.findByTestId('gameboard-daily');
        expect(targetDiv).toBeInTheDocument();
    });

    test("The custom gameboard is rendered", async () => {
        const setToken = jest.fn();
        render(<MemoryRouter>
                <Routes>
                    <Route path="" element={<Home setToken={setToken} />} />
                    <Route path="/custom" element={<Gameboard mode='custom' />} />
                </Routes>
            </MemoryRouter>);

        // Simulate a click on the Link in Home
        const linkElement = screen.getByRole('link', { name: /Custom/i });
        userEvent.click(linkElement);

        // Verify if the target page is loaded by checking for the specific element
        const targetDiv = await screen.findByTestId('gameboard-custom');
        expect(targetDiv).toBeInTheDocument();
    });

    test("The stats screen is rendered", async () => {
        const setToken = jest.fn();
        render(<MemoryRouter>
                <Routes>
                    <Route path="" element={<Home setToken={setToken} />} />
                    <Route path="/stats" element={<Stats />} />
                </Routes>
            </MemoryRouter>);

        // Simulate a click on the Link in Home
        const linkElement = screen.getByRole('link', { name: /Stats/i });
        userEvent.click(linkElement);

        // Verify if the target page is loaded by checking for the specific element
        const targetDiv = await screen.findByTestId('stats');
        expect(targetDiv).toBeInTheDocument();
    });
});