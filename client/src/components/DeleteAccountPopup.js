import React, { useContext, useState } from 'react';

import { Button, Modal } from 'react-bootstrap';

import { UserContext } from '../contexts';

function DeleteAccountPopup({ parentCallback }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    parentCallback(false, currentUser.username);
  };
  const handleDelete = () => {
    setShow(false);
    parentCallback(true, currentUser.username);
    setCurrentUser(null);
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete Account
      </Button>

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
        <Modal.Body>
          <p>Are you sure you want to delete your account?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Yes
          </Button>
          <Button onClick={handleClose}>No</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteAccountPopup;
