import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Draggable } from './Draggable';
import { useEffect, useState } from 'react';
import styles from './assets/styles.module.css';
import { Button, ButtonGroup, Col, Container, Row, Stack } from 'react-bootstrap';
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { TrackCard } from '../../models/TrackCard';
import { useAtomValue } from 'jotai';
import { UserAtom } from '../../atoms/UserAtom'; 
import { getDailyTracks, playSong } from '../../api';
import { UserStats } from '../../models/UserStats';
import { playNextSong, submitGuess } from './utils/logic';

interface GameboardProps {
    mode: "daily" | "custom"
}

export const Gameboard = ({
    mode
}: GameboardProps) => {
    const user = useAtomValue(UserAtom);
    const [revealedList, setRevealedList] = useState<TrackCard[]>([]);
    const [unrevealedList, setUnrevealedList] = useState<TrackCard[]>([]);
    const [player, setPlayer] = useState<Spotify.Player | undefined>();
    const [currentSong, setCurrentSong] = useState<TrackCard | undefined>();
    const [unrevealedCardInList, setUnrevealedCardInList] = useState<boolean>(false);
    const [isIncorrectGuess, setIsIncorrectGuess] = useState<boolean | undefined>();
    const [stats, setStats] = useState<UserStats>({
        score: 0,
        mistakes: 0,
        time: "na"
    });
    const [showAttributeModal, setShowAttributesModal] = useState<boolean>(false);


    useEffect(() => {
        getDailyTracks().then((tracks) => {
            const first = tracks.shift();
            if (!first) {
                console.error(`Not enough elements`);
            } else {
                first.revealed = true;
                setRevealedList([first]);
                setUnrevealedList(tracks);
            }
        });
    }, []);

    useEffect(() => {
        if (user && !document.getElementById('my-spotify-player')) {
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;
            script.id = 'my-spotify-player'

            
            document.body.appendChild(script);

            window.onSpotifyWebPlaybackSDKReady = () => {
                const player = new Spotify.Player({
                    name: 'TrackGssr',
                    getOAuthToken: cb => { cb(user?.token || ''); },
                    volume: 0.5
                });

                setPlayer(player);

                player.addListener('ready', ({ device_id }) => {
                    console.log('Ready with Device ID', device_id);
                });

                player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });


                player.connect();
        };
    }
    }, [user]);

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
        if (over && over.data.current?.sortable.containerId === 'droppable-area') {
            if (active.data.current?.sortable.containerId === 'droppable-area') {
                // Already in the list, now reorder
                setRevealedList((tracks) => {
                    const oldIndex = tracks.findIndex((track) => track.id === active.id);
                    const newIndex = tracks.findIndex((track) => track.id === over.id);
                    return arrayMove(tracks, oldIndex, newIndex);
                });
            } else {
                // Handle adding draggable the item to the sortable list
                setRevealedList((prevItems) => [...prevItems, unrevealedList[0]]);
                setUnrevealedList(unrevealedList.slice(1));

                // Manage when we have guess in the revealed list but have not submitted
                setUnrevealedCardInList(true);
            }
        }
    }

    const checkForIncorrectGuess = (array: TrackCard[]) => {
        return array.some((card, i) => array[i + 1] && (card.year || -1) > (array[i + 1].year || -1));
    }

    const resetAndRemoveWrongCard = () => {
        const removedIncorrectGuess = revealedList.filter((track) => track.id !== currentSong?.id);
        setRevealedList(removedIncorrectGuess);
        setIsIncorrectGuess(undefined);
        // Remove current song so the next one can be played
        setCurrentSong(undefined);
        // We can allow the next card to be moved into the gameplay area
        setUnrevealedCardInList(false);
    }

    const processCorrectGuess = () => {
            // Remove current song so the next one can be played
            setCurrentSong(undefined);
            // We can allow the next card to be moved into the gameplay area
            setUnrevealedCardInList(false);
            // Make the gameplay area green for 5 seconds
            setTimeout(() => {
                setIsIncorrectGuess(undefined);
            }, 5000);
            // Increment score by 2
            setStats({
                ...stats,
                score: stats.score + 2
            });
            // Show Attributes Modal
            setShowAttributesModal(true);
    }

    const disableNextTrack = (): boolean => {
        return !currentSong || unrevealedCardInList;
    }

    const getGameplayBackgroundColor = (): string => {
        if (isIncorrectGuess) {
            return 'incorrectBackground';
        } else if (isIncorrectGuess === false) {
            return 'correctBackground';
        }

        return 'defaultBackground';
    }

    const disableStartSongButton = (): boolean => {
        return !!currentSong || !!isIncorrectGuess;
    }

    return (
        <div data-testid={`gameboard-${mode}`} id={`gameboard-${mode}`} className='h-100 w-100'>
            {revealedList.length > 0 && unrevealedList.length > 0 ? <Container className='pt-2 h-100'>
                <DndContext onDragEnd={handleDragEnd}>
                    <Row className='h-50'>
                        <Col md={2}>
                            <span>
                                Score: {stats.score}
                            </span>
                        </Col>
                        <Col>
                            <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
                                {unrevealedList.length > 0 && <Draggable disableCard={disableNextTrack()} track={unrevealedList[0]} />}
                            </div>
                            {isIncorrectGuess && 
                                <Stack style={{ width: 'min-content', margin: 'auto' }}>
                                    <span style={{ whiteSpace: 'nowrap' }}>
                                        {`Sorry, your guess was incorrect :(`}
                                    </span>
                                    <Button variant='warning' onClick={resetAndRemoveWrongCard}>
                                        Continue
                                    </Button>
                                </Stack>
                            }
                        </Col>
                    </Row>
                    <Row className='flex-row'>
                        <Button style={{ width: 'min-content', whiteSpace: 'nowrap'}}
                            disabled={!unrevealedCardInList}
                            onClick={() => submitGuess(
                                setRevealedList,
                                currentSong || {} as TrackCard,
                                checkForIncorrectGuess,
                                revealedList,
                                setIsIncorrectGuess,
                                processCorrectGuess
                            )}
                        >
                            Confirm Guess
                        </Button>
                        <Button className='ms-2' style={{ width: 'min-content', whiteSpace: 'nowrap' }}
                            onClick={() => playNextSong(unrevealedList[0], setCurrentSong, playSong)}
                            disabled={disableStartSongButton()}
                        >
                            Start Song
                        </Button>
                        <ButtonGroup style={{ width: 'min-content' }}>
                            <Button onClick={() => {
                                player?.resume()
                            }}>
                                Play
                            </Button>
                            <Button  onClick={() => {
                                player?.pause()
                            }}>
                                Pause
                            </Button>
                        </ButtonGroup>
                    </Row>
                    <Row>
                        <Col className={`${styles.answerSection} ${styles[getGameplayBackgroundColor()]}`}>
                               <SortableContext items={revealedList} strategy={horizontalListSortingStrategy} id='droppable-area'>
                                    {revealedList.map((track) => (
                                        <SortableItem key={track.id} track={track} />
                                    ))}
                               </SortableContext>
                        </Col>
                    </Row>
                </DndContext>
            </Container> : <div>Loading...</div>}
        </div>
    )
}