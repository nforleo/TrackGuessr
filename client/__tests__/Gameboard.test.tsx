/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import { Gameboard } from '../src/components/Gameplay/Gameboard';
import { render, screen } from '@testing-library/react';

describe('The Gameboard shall be rendered', () => {
    test('A revealed card is displayed', async () => {
        render(<MemoryRouter>
            <Gameboard mode='daily' />
        </MemoryRouter>);

        const unrevealedCard =  await screen.findByTestId('unrevealed-track-card');
        expect(unrevealedCard).toBeInTheDocument();
    });

});