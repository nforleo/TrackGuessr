import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { TrackCard } from '../../models/TrackCard';

interface BackCardProps {
    track: TrackCard
}

export const BackCard = ({
    track
}: BackCardProps) => {
    return (
        <Card>
            <Card.Body>
                <span>
                    ???
                </span>
            </Card.Body>
        </Card>
    )
}