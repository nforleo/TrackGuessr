/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { UserStats } from '../src/models/UserStats';
import { User } from '../src/models/User';
import { EndSplashScreen } from '../src/components/EndSplashScreen';
import { MemoryRouter } from 'react-router';
import { Stats } from '../src/components/Stats/Stats';

jest.mock('axios');

describe('Test that the highest score stat is saved correctly', () => {
    test('An initial score is saved in the database', async () => {
        const stats: UserStats = {
            score: 5,
            time: -1,
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
        expect(await screen.findByText("Score: 5")).toBeInTheDocument();
    });
});