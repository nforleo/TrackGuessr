import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BackCard } from './BackCard';
import { TrackCard } from '../../models/TrackCard';
import { Card, OverlayTrigger, Popover, Stack } from 'react-bootstrap';

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
        <OverlayTrigger
          trigger={"hover"}
          overlay={<Popover id="track-info">
                <Popover.Header style={{color: 'black'}}>{track.year}</Popover.Header>
                <Popover.Body>
                    <Stack>
                        <span>
                            <strong>Title: </strong>{track.title}                    
                        </span>
                        <span>
                            <strong>Artist: </strong>{track.artist}
                        </span>
                        <span>
                            <strong>Album: </strong>{track.album}
                        </span>
                    </Stack>
                </Popover.Body>
            </Popover>}
          placement='top'
        >
          <Card>
            
            <Card.Body className='d-flex flex-column'>
              <span>
                {track.year}
              </span>
            </Card.Body>
          </Card>
        </OverlayTrigger>
      ) : (<BackCard track={track}/>)}
    </div>
  );
}