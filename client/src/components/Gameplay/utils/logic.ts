import { Attributes } from "../../../models/Attributes";
import { TrackCard } from "../../../models/TrackCard";
import { UserStats } from "../../../models/UserStats";
import { Guesses, ValidatedGuesses } from "../../../models/ValidatedGuesses";

export const playNextSong = (track: TrackCard, setCurrentSong: (t: TrackCard) => void, playSong: (id: string) => void): void => {
    setCurrentSong(track);
    playSong(track.id);
}

export const checkForIncorrectGuess = (array: TrackCard[]) => {
    return array.some((card, i) => array[i + 1] && (card.year || -1) > (array[i + 1].year || -1));
}

/**
 * Reveal all cards in list.
 * @param currentSong 
 */
export const setRevealedListCallback = (prevItems: TrackCard[], currentSong: TrackCard) => {
    return prevItems.map((item) =>
        item.id === currentSong?.id
            ? {...item, revealed: true}
            : item
    );
}

export const submitGuess = (
    setRevealedList: (prevItems: (t: TrackCard[]) => TrackCard[]) => void,
    currentSong: TrackCard,
    revealedList: TrackCard[],
    setIsIncorrectGuess: (b: boolean | undefined) => void,
    setUnrevealedCardInList: (v: boolean) => void,
    setStats: (u: UserStats) => void,
    setShowAttributesModal: (b: boolean) => void,
    stats: UserStats
): void => {
    // Reveal Card Order
    setRevealedList((prevItems: TrackCard[]) => setRevealedListCallback(prevItems, currentSong))


    const isGuessCorrect = !checkForIncorrectGuess(revealedList);
    setIsIncorrectGuess(!isGuessCorrect);
    
    if (isGuessCorrect) {
        processCorrectGuess(
            setUnrevealedCardInList,
            setIsIncorrectGuess,
            setStats,
            setShowAttributesModal,
            stats
        );
    }
}

export const resetAndRemoveWrongCard = (
    revealedList: TrackCard[], 
    currentSong: TrackCard | undefined,
    setRevealedList: (t: TrackCard[]) => void,
    setIsIncorrectGuess: (v: boolean | undefined) => void,
    setCurrentSong: (t: TrackCard | undefined) => void,
    setUnrevealedCardInList: (v: boolean) => void
) => {
    const removedIncorrectGuess = revealedList.filter((track) => track.id !== currentSong?.id);
    setRevealedList(removedIncorrectGuess);
    setIsIncorrectGuess(undefined);
    // Remove current song so the next one can be played
    setCurrentSong(undefined);
    // We can allow the next card to be moved into the gameplay area
    setUnrevealedCardInList(false);
}

export const checkGuesses = (
    currentSong: TrackCard | undefined,
    attributes: Attributes
): ValidatedGuesses => {
    const values = {
        score: 0,
        guesses: {
            artist: false,
            track: false,
            album: false
        }
    }

    if (currentSong?.artist?.toLowerCase() === attributes.artist.toLowerCase()) {
        values.score++;
        values.guesses.artist = true;
    }

    if (currentSong?.title?.toLowerCase() === attributes.track.toLowerCase()) {
        values.score++;
        values.guesses.track = true;
    }

    if (currentSong?.album?.toLowerCase() === attributes.album.toLowerCase()) {
        values.score++;
        values.guesses.album = true;
    }

    return values;
}

export const validateAttributeGuess = (
    currentSong: TrackCard | undefined,
    attributes: Attributes,
    setIsSubmitted: (b: boolean) => void,
    setCurrentSong: (s: TrackCard | undefined) => void,
    setCheckedGuesses: (g: Guesses) => void,
    setStats: (s: UserStats) => void,
    stats: UserStats
): void => {
    console.log('Current Song:', currentSong);
    console.log('Attributes:', attributes);
    
    // Get Score and check which ones where right and wrong
    const values = checkGuesses(
        currentSong,
        attributes
    );
    // Set values used for background
    setCheckedGuesses(values.guesses);

    // Update Score
    setStats(incrementScore(stats, values.score));
    
    // Allow user to close Modal
    setIsSubmitted(true);

     // Remove current song so the next one can be played
    setCurrentSong(undefined);
}

export const incrementScore = (stats: UserStats, score: number): UserStats => {
    return {
        ...stats,
        score: stats.score + score
    };
}

export const processCorrectGuess = (
    setUnrevealedCardInList: (b: boolean) => void,
    setIsIncorrectGuess: (u: undefined) => void,
    setStats: (u: UserStats) => void,
    setShowAttributesModal: (b: boolean) => void,
    stats: UserStats
) => {
        // We can allow the next card to be moved into the gameplay area
        setUnrevealedCardInList(false);
        // Make the gameplay area green for 5 seconds
        setTimeout(() => {
            setIsIncorrectGuess(undefined);
        }, 5000);
        // Increment score by 2
        setStats(incrementScore(stats, 2));
        // Show Attributes Modal
        setShowAttributesModal(true);
}

export const getGameplayBackgroundColor = (isIncorrectGuess: boolean | undefined): string => {
    if (isIncorrectGuess) {
        return 'incorrectBackground';
    } else if (isIncorrectGuess === false) {
        return 'correctBackground';
    }

    return 'defaultBackground';
}