import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './ModalGenerate.scss';

function ModalGenerate(props) {
    const [ value, setValue ] = useState(0); 

    return (
        <>
        <Modal
        {...props}
        >
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Create your world</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Water level: {value}</Form.Label>
                        <Form.Range 
                            min={-1.0} 
                            max={1.0} 
                            step={0.01} 
                            value={props.waterLevel}
                            onChange={props.onWaterChange}
                        >
                        </Form.Range>
                        <Form.Label>Forest intensity</Form.Label>
                        <Form.Range></Form.Range>
                        <Form.Label>Mountains' level</Form.Label>
                        <Form.Range></Form.Range>
                        <Form.Label>Perlin Sample Scale</Form.Label>
                        <Form.Range></Form.Range>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant='secondary'>Close</Button>
                <Button variant='primary' onClick={props.onHide}>Generate!</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
        </>
    );
}

export default ModalGenerate;