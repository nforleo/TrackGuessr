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
import { getDailyTracks, playSong, updateStats } from '../../api';
import { UserStats } from '../../models/UserStats';
import {  formatTime, getGameplayBackgroundColor, playNextSong, resetAndRemoveWrongCard, submitGuess, updateTimer } from './utils/logic';
import { GuessAttributesModal } from './GuessAttributesModal';
import { EndSplashScreen } from '../EndSplashScreen';
import { User } from '../../models/User';

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
        time: 0
    });
    const [showAttributeModal, setShowAttributesModal] = useState<boolean>(false);
    const [hasLoaded, setHasLoaded] = useState<boolean>(false);
    const [isFinished, setIsFinished] = useState<boolean>(false);

    const [time, setTime] = useState<number>(0);
    const [running, setRunning] = useState<boolean>(false);

    useEffect(() => {
        updateTimer(running, setTime);
    }, [running]);

    useEffect(() => {
        if (isFinished) {
            setStats({
                ...stats,
                time
            });
            setRunning(false);
        }
    }, [isFinished])

    useEffect(() => {
        getDailyTracks().then((tracks) => {
            const first = tracks.shift();
            if (!first) {
                console.error(`Not enough elements`);
            } else {
                first.revealed = true;
                setRevealedList([first]);
                setUnrevealedList(tracks);
                setHasLoaded(true);
                setRunning(true);
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

    const disableNextTrack = (): boolean => {
        return !currentSong || unrevealedCardInList;
    }

    const disableStartSongButton = (): boolean => {
        return !!currentSong || !!isIncorrectGuess;
    }

    return (
        <div data-testid={`gameboard-${mode}`} id={`gameboard-${mode}`} className='h-100 w-100'>
            {isFinished && !running ? 
            <EndSplashScreen stats={stats} user={user || {} as User} updateStats={updateStats}/> :
            revealedList.length > 0 && hasLoaded ? <Container className='pt-2 h-100'>
                {showAttributeModal && <GuessAttributesModal 
                    setShow={setShowAttributesModal} 
                    show={showAttributeModal} 
                    currentSong={currentSong}
                    setCurrentSong={setCurrentSong}
                    setStats={setStats}
                    stats={stats}
                    setIsFinished={setIsFinished}
                    hasLoaded={hasLoaded}
                    unrevealedList={unrevealedList}
                    unrevealedCardInList={unrevealedCardInList}
                />}
                <DndContext onDragEnd={handleDragEnd}>
                    <Row className='h-50'>
                        <Col md={2} id='current-game-stats'>
                            <Stack>
                                <span>
                                    Songs Remaining: {unrevealedList.length}
                                </span>
                                <span>
                                    Score: {stats.score}
                                </span>
                                <span data-testid="mistakes">
                                    Mistakes: {stats.mistakes}
                                </span>
                                <span data-testid="timer">
                                    Time: {formatTime(time)}
                                </span>
                            </Stack>
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
                                    <Button variant='warning' onClick={() =>
                                        resetAndRemoveWrongCard(
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
                                        )
                                    }>
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
                                revealedList,
                                setIsIncorrectGuess,
                                setUnrevealedCardInList,
                                setStats,
                                setShowAttributesModal,
                                stats
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
                        <Col className={`${styles.answerSection} ${styles[getGameplayBackgroundColor(isIncorrectGuess)]}`}>
                               <SortableContext items={revealedList} strategy={horizontalListSortingStrategy} id='droppable-area'>
                                    {revealedList.map((track) => (
                                        <SortableItem key={track.id} track={track} />
                                    ))}
                               </SortableContext>
                        </Col>
                    </Row>
                </DndContext>
            </Container> 
            : <div>Loading...</div>}
        </div>
    )
}