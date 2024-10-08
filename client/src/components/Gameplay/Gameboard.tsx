import { closestCenter, DndContext, DragEndEvent, DragStartEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Droppable } from './Droppable';
import { Draggable } from './Draggable';
import { useEffect, useState } from 'react';
import styles from './assets/styles.module.css';
import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import { arrayMove, horizontalListSortingStrategy, rectSortingStrategy, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { TrackCard } from '../../models/TrackCard';
import { useAtomValue } from 'jotai';
import { UserAtom } from '../../atoms/UserAtom';
import { getDailyTracks, playSong } from '../../api';

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

    useEffect(() => {
        getDailyTracks().then((tracks) => {
            const first = tracks.shift();
            if (!first) {
                console.error(`Not enough elements`);
            } else {
                // console.log('Setting the 2 lists...');
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

    const playNextSong = (): void => {
        console.log('Calling play next song');
        const track = unrevealedList[0];
        setCurrentSong(track);
        playSong(track.id);
    }

    const submitGuess = (): void => {
        // Reveal Card Order
        setRevealedList((prevItems) => 
            prevItems.map((item) =>
                item.id === currentSong?.id
                    ? {...item, revealed: true}
                    : item
            )
        )

        // Remove current song so the next one can be played
        setCurrentSong(undefined);
        // We can allow the next card to be moved into the gameplay area
        setUnrevealedCardInList(false);
    }

    const readyForNextTrack = (): boolean => {
        return !currentSong || unrevealedCardInList;
    }

    // useEffect(() => {
    //     console.log('currentSong and currentSong.revealed', {currentSong: !currentSong, revealed: !currentSong?.revealed})
    // }, [JSON.stringify(currentSong)]);

    return (
        <div data-testid={`gameboard-${mode}`} id={`gameboard-${mode}`} className='h-100 w-100'>
            {revealedList.length > 0 && unrevealedList.length > 0 ? <Container className='pt-2 h-100'>
                <DndContext onDragEnd={handleDragEnd}>
                    <Row className='h-50'>
                        <Col>
                            <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
                                {unrevealedList.length > 0 && <Draggable disableCard={readyForNextTrack()} track={unrevealedList[0]} />}
                            </div>
                        </Col>
                    </Row>
                    {/* <Row className='h-50'> */}
                    <Row className='flex-row'>
                        <Button style={{ width: 'min-content', whiteSpace: 'nowrap'}}
                            disabled={!unrevealedCardInList}
                            onClick={submitGuess}
                        >
                            Confirm Guess
                        </Button>
                        <Button className='ms-2' style={{ width: 'min-content', whiteSpace: 'nowrap' }}
                            onClick={playNextSong}
                            disabled={!!currentSong}
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
                        <Col className={`${styles.answerSection}`}>
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