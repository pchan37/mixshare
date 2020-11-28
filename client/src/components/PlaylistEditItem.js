import React, { useState } from 'react';
import Axios from 'axios';
import PropsType from 'prop-types';

import { Button, OverlayTrigger, Popover, Modal } from 'react-bootstrap';
import { CardGiftcard, Delete } from '@material-ui/icons';
import { HorizontalThumbnail } from './';
import SimpleUser from './SimpleUser';

import data from '../placeholders/data';

const CardGiftPopup = (
  <Popover>
    <Popover.Content className="mr-2">
      {data.friends.map((f) => {
        return (
          <SimpleUser key={f.id} username={f.username}>
            <Button variant="flat">
              <CardGiftcard style={{ color: '#979696' }} />
            </Button>
          </SimpleUser>
        );
      })}
    </Popover.Content>
  </Popover>
);

function DeleteSongPopup(props) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleDelete = () => {
    setShow(false);
    props.parentCallback(true, props.song.playlistId, props.song.songId);
  };

  return (
    <>
      <Button variant="flat" onClick={handleShow}>
        <Delete style={{ color: '#979696' }} />
      </Button>

      <Modal
        {...props}
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
          <p>
            Are you sure you want to delete <b>{props.song.name}</b>?
          </p>
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

const getModalResponse = async (del, playlistId, songId) => {
  if (del) {
    try {
      console.log('Deleting Song');
      const deletedSong = await Axios.post('api/playlist/deleteSong', {
        playlistId: playlistId,
        songId: songId,
      });
      console.log(deletedSong);
    } catch (err) {
      console.error(err);
    }
  }
};

const PlaylistEditItem = (props) => {
  return (
    <div className="d-flex flex-row mt-3">
      <div className="d-flex flex-row flex-grow-1 ml-4">
        <HorizontalThumbnail
          name={props.name}
          artist={props.artist}
          thumbnail={props.thumbnail}
        />
      </div>

      <OverlayTrigger
        placement="left"
        delay={{ show: 250, hide: 400 }}
        overlay={CardGiftPopup}
        trigger="click">
        <Button variant="flat">
          <CardGiftcard style={{ color: '#979696' }} />
        </Button>
      </OverlayTrigger>

      <DeleteSongPopup song={props} parentCallback={getModalResponse} />
    </div>
  );
};

PlaylistEditItem.propsType = {
  name: PropsType.string.isRequired,
};

export default PlaylistEditItem;
