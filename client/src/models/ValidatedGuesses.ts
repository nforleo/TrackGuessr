export type ValidatedGuesses = {
    score: number;
    guesses: Guesses
}

export type Guesses = {
    artist: boolean;
    track: boolean;
    album: boolean;
}