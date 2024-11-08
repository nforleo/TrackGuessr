/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { UserStats } from '../src/models/UserStats';
import { User } from '../src/models/User';
import { EndSplashScreen } from '../src/components/EndSplashScreen';
import { MemoryRouter } from 'react-router';
import { Stats } from '../src/components/Stats/Stats';

jest.mock('axios');

describe('Test that the fastest time stat is saved correctly', () => {
    test('An initial score is saved in the database', async () => {
        const stats: UserStats = {
            score: -1,
            time: 1000,
            mistakes: -1
        };

        const user: User = {
            token: 'a',
            email: 'test@mail.com',
            name: 'b'
        }

        const updateStats = jest.fn();
        const getUserStats = jest.fn().mockResolvedValue({
            ...stats
        });

        // Save First stat
        render(<MemoryRouter><EndSplashScreen user={user} stats={stats} updateStats={updateStats}/></MemoryRouter>)

        expect(updateStats).toHaveBeenCalled();

        // Load stats screen and make sure it's the same value
        render(<MemoryRouter><Stats user={user} getUserStats={getUserStats} /></MemoryRouter>)

        // Expect The first value to be rendered.
        expect(await screen.findByText("Your Time: 00:01:00")).toBeInTheDocument();
    });
});