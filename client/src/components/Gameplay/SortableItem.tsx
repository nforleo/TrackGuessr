import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BackCard } from './BackCard';
import { TrackCard } from '../../models/TrackCard';
import { Card } from 'react-bootstrap';

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
        height: 'min-content',
        width: '200px'
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} data-testid={`track-card-revealed-${track.id}`}>
      {track.revealed ? (
        <Card>
          <Card.Body className='d-flex flex-column'>
            <span>
              {track.year}
            </span>
          </Card.Body>
        </Card>
      ) : (<BackCard track={track}/>)}
    </div>
  );
}