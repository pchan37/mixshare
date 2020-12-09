import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalAlert = (props) => (
  <Modal {...props}>
    <Modal.Body>
      <h5>{props.errorCode}</h5>
      <p>{props.statusMessage}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
);

export default ModalAlert;
