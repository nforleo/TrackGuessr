import React, { ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';

interface DroppableProps {
    children: ReactNode
    className?: string
};

export const Droppable = ({
    children,
    className = ''
}: DroppableProps) => {
    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable'
    });

    const style = {
        color: isOver ? 'green' : undefined,
    };

    return (
        <div ref={setNodeRef} style={style} className={className}>
            {children}
        </div>
    )
}