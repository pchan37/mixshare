import React, { useState } from 'react';

import { Button, Modal } from 'react-bootstrap';

function DeletePopup(props) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    props.getResponse(false);
  };
  const handleDelete = () => {
    setShow(false);
    props.getResponse(true);
  };

  return (
    <>
      <div onClick={handleShow}>{props.children}</div>

      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Confirm Deletion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.bodytext}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleDelete}>
            Yes
          </Button>
          <Button variant="outline-primary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeletePopup;
