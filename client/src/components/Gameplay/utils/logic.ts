import { TrackCard } from "../../../models/TrackCard";

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