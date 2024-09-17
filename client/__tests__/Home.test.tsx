/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import Home from '../src/components/Home';
import { cleanup, screen, render } from '@testing-library/react';

afterAll(cleanup);

describe('Check that Home screen is rendered correctly', () => {
    /**
     * Test that the Daily Button loads correctly on the
     *  Home Screen
     */
    test('renders a button with the text "Daily"', () => {
        // const [token, setToken] = useState('');
        const setToken = jest.fn();
        render(<Home setToken={setToken} />);
        const dailyButton = screen.getByText('Daily');
        expect(dailyButton).toBeInTheDocument();
    });

    /**
     * Test that the Custom Button loads correctly on the
     *  Home Screen
     */
    test('renders a button with the text "Custom"', () => {
        // const [token, setToken] = useState('');
        const setToken = jest.fn();
        render(<Home setToken={setToken} />);
        const dailyButton = screen.getByText('Custom');
        expect(dailyButton).toBeInTheDocument();
    });

    /**
     * Test that the Stats Button loads correctly on the
     *  Home Screen
     */
    test('renders a button with the text "Stats"', () => {
        // const [token, setToken] = useState('');
        const setToken = jest.fn();
        render(<Home setToken={setToken} />);
        const dailyButton = screen.getByText('Stats');
        expect(dailyButton).toBeInTheDocument();
    });

    /**
     * Test that the Log Out Button loads correctly on the
     *  Home Screen
     */
    test('renders a button with the text "Log Out"', () => {
        // const [token, setToken] = useState('');
        const setToken = jest.fn();
        render(<Home setToken={setToken} />);
        const dailyButton = screen.getByText('Log Out');
        expect(dailyButton).toBeInTheDocument();
    });
})