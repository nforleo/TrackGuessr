import React, { ReactNode } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Card } from 'react-bootstrap';

interface DraggableProps {
    // children: ReactNode,
    id: string
};

export const Draggable = ({
    // children,
    id
}: DraggableProps) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <Card>
            <Card.Body>
                Draggable {id}
            </Card.Body>
        </Card>
    </div>
  );
}