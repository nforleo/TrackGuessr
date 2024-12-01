import { ChangeEvent, useState } from "react";
import { Button, Form, InputGroup, Modal, Stack } from "react-bootstrap"
import { Attributes } from "../../models/Attributes";
import { giveUp, validateAttributeGuess } from "./utils/logic";
import { TrackCard } from "../../models/TrackCard";
import { Guesses } from "../../models/ValidatedGuesses";
import styles from './assets/styles.module.css';
import { UserStats } from "../../models/UserStats";

interface GuessAttributesModalProps {
    show: boolean;
    setShow: (b: boolean) => void;
    currentSong: TrackCard | undefined;
    setCurrentSong: (t: TrackCard | undefined) => void;
    setStats: (s: UserStats) => void;
    stats: UserStats;
    setIsFinished: (b: boolean) => void;
    hasLoaded: boolean;
    unrevealedList: TrackCard[];
    unrevealedCardInList: boolean;
}

export const GuessAttributesModal = ({
    show,
    setShow,
    currentSong,
    setCurrentSong,
    setStats,
    stats,
    setIsFinished,
    hasLoaded,
    unrevealedList,
    unrevealedCardInList
}: GuessAttributesModalProps): JSX.Element => {

    const [checkedGuesses, setCheckedGuesses] = useState<Guesses>({} as Guesses);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [attributes, setAttributes] = useState<Attributes>({
        artist: '',
        track: '',
        album: ''
    })

    const handleArtistChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAttributes({
            ...attributes,
            artist: event.target.value
        });
    }

    const handleTrackChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAttributes({
            ...attributes,
            track: event.target.value
        });
    }

    const handleAlbumChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAttributes({
            ...attributes,
            album: event.target.value
        });
    }

    return (<Modal id="attributes-modal" size="lg" show={show}>
        <Modal.Header>
            <Modal.Title>Enter Attribute</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Stack gap={3}>
                <InputGroup>
                    <InputGroup.Text id="inputGroup-artist">
                        Artist Name
                    </InputGroup.Text>
                    <Form.Control
                        aria-label="Artist"
                        aria-describedby="inputGroup-artist"
                        data-testid='input-artist'
                        onChange={handleArtistChange}
                        className={checkedGuesses.artist ? 
                            styles.correctBackground : 
                            checkedGuesses.album === false ?
                            styles.incorrectBackground :
                            styles.defaultBackground
                        }
                    />
                </InputGroup>
                <InputGroup>
                    <InputGroup.Text id="inputGroup-track">
                        Track Name
                    </InputGroup.Text>
                    <Form.Control
                        aria-label="Track"
                        aria-describedby="inputGroup-track"
                        data-testid='input-track'
                        onChange={handleTrackChange}
                        className={checkedGuesses.track ? 
                            styles.correctBackground : 
                            checkedGuesses.album === false ?
                            styles.incorrectBackground :
                            styles.defaultBackground
                        }
                    />
                </InputGroup>
                <InputGroup>
                    <InputGroup.Text id="inputGroup-album">
                        Album Name
                    </InputGroup.Text>
                    <Form.Control
                        aria-label="Album"
                        aria-describedby="inputGroup-album"
                        data-testid='input-album'
                        onChange={handleAlbumChange}
                        className={checkedGuesses.album ? 
                            styles.correctBackground : 
                            checkedGuesses.album === false ?
                            styles.incorrectBackground :
                            styles.defaultBackground
                        }
                    />
                </InputGroup>
            </Stack>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='outline-danger'
                onClick={() => giveUp(
                    setShow,
                    setCurrentSong,
                    setIsFinished,
                    hasLoaded,
                    unrevealedList,
                    unrevealedCardInList
                )}
            >
                Give Up
            </Button>
            {!isSubmitted && <Button
                variant="success"
                onClick={() => {
                    validateAttributeGuess(
                        currentSong, 
                        attributes,
                        setIsSubmitted,
                        setCurrentSong,
                        setCheckedGuesses,
                        setStats,
                        stats,
                        setIsFinished,
                        hasLoaded,
                        unrevealedList,
                        unrevealedCardInList
                    )
                }}
            >
                Submit
            </Button>}
            {isSubmitted && <Button
                variant="primary"
                 onClick={() => setShow(false)}
            >
                Close
            </Button>}
        </Modal.Footer>
    </Modal>);
}