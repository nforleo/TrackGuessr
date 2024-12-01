import { ChangeEvent } from "react";
import { Button, ButtonGroup, Form, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"

interface SelectNumOfSongsModalProps {
    show: boolean;
    setShow: (b: boolean) => void;
    numSongs: number | undefined;
    setNumSongs: (n: number | undefined) => void;
}

export const SelectNumOfSongsModal = ({
    show,
    setShow,
    numSongs = 10,
    setNumSongs
}: SelectNumOfSongsModalProps): JSX.Element => {
    const onRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNumSongs(parseInt(e.target.value));
    };

    return <Modal size="sm" show={show} style={{ color: 'black'}}>
        <Modal.Title className="ps-1">
            Select Number of Songs
        </Modal.Title>
        <Modal.Body>
            <Form.Label>Number of Songs: [2, 300]</Form.Label>
            <Form.Range min={2} max={300} onChange={onRangeChange} value={numSongs}/>
            <span>
                Selected Number: {numSongs}
            </span>
            <ButtonGroup className="ps-3">
                <Button 
                    variant="outline-primary"
                    onClick={() => {
                        if (numSongs > 2) {
                            setNumSongs(numSongs - 1);
                        }
                    }}
                >
                    -
                </Button>
                <Button 
                    variant="outline-primary"
                    onClick={() => {
                        if (numSongs < 300) {
                            setNumSongs(numSongs + 1);
                        }
                    }}
                >
                    +
                </Button>
            </ButtonGroup>
        </Modal.Body>
        <Modal.Footer>
            <Link style={{width: 'min-content'}} to="/" className="btn btn-outline-danger">
                Home
            </Link>
            <Button onClick={() => {
                setShow(false);
            }}>
                Continue
            </Button>
        </Modal.Footer>
    </Modal>
}

