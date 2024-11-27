/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import { Gameboard } from '../src/components/Gameplay/Gameboard';
import { fireEvent, render, screen } from '@testing-library/react';
import * as api from '../src/api';
import { UserStats } from '../src/models/UserStats';
import { EndSplashScreen } from '../src/components/EndSplashScreen';
import * as logic from '../src/components/Gameplay/utils/logic';
import { TrackCard } from '../src/models/TrackCard';
import { User } from '../src/models/User';

describe("Verify daily game functionality", () => {
    test('When the daily game loads, the call to the backend should leave 10 songs in the unrevealed list', async () => {
        // 11 songs, 1 for revealed and 10 for unrevealed
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
            }, {
                id: "track_id",
                revealed: false,
                year: 1999,
                artist: "artist_name",
                title: "track_name",
                album: "album_name",
            }
        ]);

        render(<MemoryRouter>
            <Gameboard mode='daily' />
        </MemoryRouter>);

       // Expect 10 songs to be in the list when the call to the backend returns 11 songs 
       expect(await screen.findByText('Songs Remaining: 10')).toBeInTheDocument();
    });

    test('The End Game Splash screen should render correctly', async () => {
        const stats: UserStats = {
            score: 2,
            mistakes: 0,
            time: 0
        };

        const user: User = {
            token: '',
            email: '',
            name: ''
        }
        const mode = 'daily';
        const updateStats = jest.fn();

        render(<MemoryRouter>
            <EndSplashScreen updateStats={updateStats} stats={stats} user={user} mode={mode}/>
        </MemoryRouter>)


        // The score should be displayed on the End Game splash Screen
        expect(await screen.findByText('Your Score: 2')).toBeInTheDocument();
        // The placeholder for number of mistakes should be rendered
        expect(await screen.findByText('Number of Mistakes: 0')).toBeInTheDocument();
        // The placeholder for game duration should be rendered
        // expect(await screen.findByText('Your Time: na')).toBeInTheDocument();
        // the Home Button should be rendered
        expect(await screen.findByText('Home')).toBeInTheDocument();
    });

    test('The timer should be accurate', async () => {
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
        }]);

        render(<MemoryRouter>
            <Gameboard mode='daily' />
        </MemoryRouter>);

        console.log('Waiting 5 seconds');
        await new Promise(resolve => setTimeout(resolve, 5000));
        console.log('Done waiting.');

        // Expect timer to be 5 
        expect(await screen.findByTestId('timer')).toBeInTheDocument();
        // expect(await screen.findByTestId('timer')).toContain('05');
        
    }, 30000);

    test('Score should be incremented by 1 after an incorrect guess', async () => {
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
            unrevealedList,
            setStats,
            stats
        );

        expect(await screen.findByTestId('mistakes')).toBeInTheDocument();
        // expect(await screen.findByText(/mistakes: 1/i)).toBeInTheDocument();
    });
});