import React, { ReactNode, useEffect, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Card } from 'react-bootstrap';
import { TrackCard } from '../../models/TrackCard';
import { BackCard } from './BackCard';

interface DraggableProps {
    track: TrackCard,
    disableCard: boolean;
};

export const Draggable = ({
    track,
    disableCard
}: DraggableProps) => {

  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: track.id,
    disabled: isDisabled
  });

  useEffect(() => {
    console.log('is disabled?', disableCard);
    setIsDisabled(disableCard);
  }, [disableCard]);

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} data-testid={`track-card-unrevealed-${track.id}`}>
        {/* <Card>
            <Card.Body>
                Draggable {id}
            </Card.Body>
        </Card> */}
        <BackCard track={track} />
    </div>
  );
}