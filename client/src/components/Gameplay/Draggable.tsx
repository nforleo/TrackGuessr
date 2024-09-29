import React, { ReactNode } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Card } from 'react-bootstrap';
import { TrackCard } from '../../models/TrackCard';
import { BackCard } from './BackCard';

interface DraggableProps {
    track: TrackCard,
};

export const Draggable = ({
    track,
}: DraggableProps) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: track.id,
  });

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