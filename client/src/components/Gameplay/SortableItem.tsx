import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from 'react-bootstrap';
import { TrackCard } from '../../models/TrackCard';

interface SortableItemProps {
    track: TrackCard;
}

export const SortableItem = ({
    track
}: SortableItemProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: track.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        // padding: '8px',
        // margin: '4px 0',
        // background: '#f0f0f0',
        // border: '1px solid #ccc',
        // borderRadius: '4px',
        height: 'min-content',
        width: '200px'
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card>
        <Card.Body className='d-flex flex-column'>
          <span>
            {track.id}
          </span>
          {!track.revealed && <span>
            Back of Card</span>}
        </Card.Body>
      </Card>
    </div>
  );
}