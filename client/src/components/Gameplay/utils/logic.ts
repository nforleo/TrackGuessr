import { TrackCard } from "../../../models/TrackCard";

export const playNextSong = (track: TrackCard, setCurrentSong: (t: TrackCard) => void, playSong: (id: string) => void): void => {
    setCurrentSong(track);
    playSong(track.id);
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
    checkForIncorrectGuess: (t: TrackCard[]) => boolean,
    revealedList: TrackCard[],
    setIsIncorrectGuess: (b: boolean) => void,
    processCorrectGuess: () => void
): void => {
    // Reveal Card Order
    setRevealedList((prevItems: TrackCard[]) => setRevealedListCallback(prevItems, currentSong))


    const isGuessCorrect = !checkForIncorrectGuess(revealedList);
    setIsIncorrectGuess(!isGuessCorrect);
    
    if (isGuessCorrect) {
        processCorrectGuess();
    }
}