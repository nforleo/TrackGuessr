import { closestCenter, DndContext, DragEndEvent, DragStartEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Droppable } from './Droppable';
import { Draggable } from './Draggable';
import { useState } from 'react';
import styles from './assets/styles.module.css';
import { Col, Container, Row } from 'react-bootstrap';
import { arrayMove, horizontalListSortingStrategy, rectSortingStrategy, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

interface GameboardProps {
    mode: "daily" | "custom"
}

export const Gameboard = ({
    mode
}: GameboardProps) => {

    const [items, setItems] = useState(['Item 11']);
    const [unrevealedList, setUnrevealedList] = useState(['Item 1','Item 2','Item 3','Item 4','Item 5','Item 6','Item 7','Item 8','Item 9','Item 10'])
    const [activeId, setActiveId] = useState<string | null>(null);


    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        console.log('active, over', {active, over});

        // if (over && active.id !== over.id) {
        //     setItems((items) => {
        //         const oldIndex = items.indexOf(active.id as string);
        //         const newIndex = items.indexOf(over.id as string);
        //         return arrayMove(items, oldIndex, newIndex);
        //     });
        // } else 
        if (over && over.data.current?.sortable.containerId === 'droppable-area' && active.data.current?.sortable.containerId !== 'droppable-area') {
            // Handle adding the item to the sortable list
            console.log('Moving Draggable to Droppable Area!!');
            setItems((prevItems) => [...prevItems, active.id as string]);
            setUnrevealedList(unrevealedList.slice(1));
        }

        setActiveId(null);
    }

    return (
        <div data-testid={`gameboard-${mode}`} id={`gameboard-${mode}`} className='h-100 w-100'>
            <Container className='pt-2 h-100'>
                <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                    <Row className='h-50'>
                        <Col>
                            <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
                                {/* {activeId === null && <Draggable id="Item 1" />} */}
                                {unrevealedList.length > 0 && <Draggable id={unrevealedList[0]} />}
                            </div>
                        </Col>
                    </Row>
                    <Row className='h-50'>
                        <Col className={`${styles.answerSection}`}>
                               <SortableContext items={items} strategy={horizontalListSortingStrategy} id='droppable-area'>
                                    {items.map((id) => (
                                        <SortableItem key={id} id={id} />
                                    ))}
                               </SortableContext>
                        </Col>
                    </Row>
                </DndContext>
            </Container>
        </div>
    )
}