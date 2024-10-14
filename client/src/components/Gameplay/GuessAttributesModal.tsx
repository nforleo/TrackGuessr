import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal, Stack } from "react-bootstrap"
import { Attributes } from "../../models/Attributes";

interface GuessAttributesModalProps {
    show: boolean;
    setShow: (b: boolean) => void;
}

export const GuessAttributesModal = ({
    show,
    setShow
}: GuessAttributesModalProps): JSX.Element => {

    const [attributes, setAttributes] = useState<Attributes>({
        artist: '',
        track: '',
        album: ''
    })

    const handleArtistChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAttributes({
            ...attributes,
            artist: event.target.value
        });
    }

    const handleTrackChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAttributes({
            ...attributes,
            track: event.target.value
        });
    }

    const handleAlbumChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAttributes({
            ...attributes,
            album: event.target.value
        });
    }

    useEffect(() => {
        console.log('Attributes', attributes);
    }, [JSON.stringify(attributes)]);

    return (<Modal size="lg" show={show}>
        <Modal.Header>
            <Modal.Title>Enter Attribue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Stack gap={3}>
                <InputGroup>
                    <InputGroup.Text id="inputGroup-artist">
                        Artist Name
                    </InputGroup.Text>
                    <Form.Control
                        aria-label="Artist"
                        aria-describedby="inputGroup-artist"
                        onChange={handleArtistChange}
                    />
                </InputGroup>
                <InputGroup>
                    <InputGroup.Text id="inputGroup-track">
                        Track Name
                    </InputGroup.Text>
                    <Form.Control
                        aria-label="Track"
                        aria-describedby="inputGroup-track"
                        onChange={handleTrackChange}
                    />
                </InputGroup>
                <InputGroup>
                    <InputGroup.Text id="inputGroup-album">
                        Album
                    </InputGroup.Text>
                    <Form.Control
                        aria-label="Album"
                        aria-describedby="inputGroup-album"
                        onChange={handleAlbumChange}
                    />
                </InputGroup>
            </Stack>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='outline-danger'
                onClick={() => setShow(false)}
            >
                Give Up
            </Button>
            <Button
                variant="success"
                onClick={() => {
                    console.log('Confirming')
                }}
            >
                Submit
            </Button>
        </Modal.Footer>
    </Modal>);
}