import { TrackCard } from "../../../models/TrackCard";

export const playNextSong = (track: TrackCard, setCurrentSong: (t: TrackCard) => void, playSong: (id: string) => void): void => {
    setCurrentSong(track);
    playSong(track.id);
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
    setRevealedList((prevItems: TrackCard[]) => 
        prevItems.map((item) =>
            item.id === currentSong?.id
                ? {...item, revealed: true}
                : item
        )
    )


    const isGuessCorrect = !checkForIncorrectGuess(revealedList);
    setIsIncorrectGuess(!isGuessCorrect);
    
    if (isGuessCorrect) {
        processCorrectGuess();
    }
}