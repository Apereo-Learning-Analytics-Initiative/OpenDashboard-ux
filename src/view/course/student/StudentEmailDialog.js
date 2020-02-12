import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
// import { useSelectedStudent } from '../../../context/Course';



export function StudentEmailDialog () {

    // const student = useSelectedStudent();

    const [modal, setModal] = React.useState(false);
    const [formText, setFormText] = React.useState('');

    const toggle = () => setModal(!modal);

    const handleSubmit = () => alert('form submitted' + formText);

    const handleChange = (event) => setFormText(event.target.value);

    function sendEmail() 
    {
        window.location = "mailto:xyz@abc.com";
    }

    return (
        <React.Fragment>
            <div><FontAwesomeIcon color="secondary" icon={faEnvelope} />tttt</div>
            <Button color="secondary" onClick={sendEmail}>
                 <FontAwesomeIcon icon={faEnvelope} />
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    Email
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={ (event) => handleSubmit() }>
                        <FormGroup>
                            <Label for="emailInput">message</Label>
                            <Input
                                id="emailInput"
                                type="textarea"
                                value={formText}
                                onChange={(event) => handleChange(event)} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Send Email</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
}

export default StudentEmailDialog;