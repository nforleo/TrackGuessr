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

interface GameboardProps {
    mode: "daily" | "custom"
}

export const Gameboard = ({
    mode
}: GameboardProps) => {

    const [revealedList, setRevealedList] = useState<TrackCard[]>([{
        id: '1',
        revealed: true,
        year: 2011,
        album: 'Trail Of Flowers',
        title: 'I Could Drive You Crazy',
    }]);
    const [unrevealedList, setUnrevealedList] = useState([
  {
    id: '2',
    revealed: false,
    year: 2015,
    album: 'Shadows in the Mist',
    title: 'Lost in the Echo',
  },
  {
    id: '3',
    revealed: false,
    year: 2008,
    album: 'Breaking Silence',
    title: 'Voices in My Head',
  },
  {
    id: '4',
    revealed: false,
    year: 2019,
    album: 'New Horizons',
    title: 'Fading Memories',
  },
  {
    id: '5',
    revealed: false,
    year: 2003,
    album: 'Time Will Tell',
    title: 'Echoes of the Past',
  },
  {
    id: '6',
    revealed: false,
    year: 2017,
    album: 'Into the Abyss',
    title: 'Beyond the Stars',
  },
  {
    id: '7',
    revealed: false,
    year: 2012,
    album: 'Silent Waves',
    title: 'The Deep End',
  },
  {
    id: '8',
    revealed: false,
    year: 2005,
    album: 'Nocturnal Stories',
    title: 'Midnight Whisper',
  },
  {
    id: '9',
    revealed: false,
    year: 2010,
    album: 'Luminous',
    title: 'Bright Eyes',
  },
  {
    id: '10',
    revealed: false,
    year: 2018,
    album: 'The Wanderer',
    title: 'Endless Roads',
  },
]);
    const user = useAtomValue(UserAtom);
    const [player, setPlayer] = useState<Spotify.Player | undefined>();

    useEffect(() => {
        if (user && !document.getElementById('my-spotify-player')) {
            console.log('Gameborad - user', user);
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

        console.log('ACTIVE', active); 

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
            }
        }
    }

    return (
        <div data-testid={`gameboard-${mode}`} id={`gameboard-${mode}`} className='h-100 w-100'>
            <Container className='pt-2 h-100'>
                <DndContext onDragEnd={handleDragEnd}>
                    <Row className='h-50'>
                        <Col>
                            <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
                                {/* {activeId === null && <Draggable id="Item 1" />} */}
                                {unrevealedList.length > 0 && <Draggable id={unrevealedList[0].id} />}
                            </div>
                        </Col>
                    </Row>
                    {/* <Row className='h-50'> */}
                    <Row className='flex-row'>
                        <Button style={{ width: 'min-content', whiteSpace: 'nowrap'}}>
                            Confirm Guess
                        </Button>
                        <ButtonGroup style={{ width: 'min-content' }}>
                            <Button onClick={() => {
                                player?.togglePlay()
                            }}>
                                Play
                            </Button>
                            <Button  onClick={() => {
                                player?.togglePlay()
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
            </Container>
        </div>
    )
}