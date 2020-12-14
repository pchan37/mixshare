import React, { useState, useContext } from 'react';
import Axios from 'axios';
import PropsType from 'prop-types';

import { Button, Modal } from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import { FriendListPopup, HorizontalThumbnail } from './';
import { CurrentEditPlaylistContext } from '../contexts';

function DeleteSongModal(props) {
  const { currentEditPlaylist } = useContext(CurrentEditPlaylistContext);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleDelete = async () => {
    try {
      setShow(false);
      const val = await props.parentCallback(
        true,
        currentEditPlaylist.id,
        props.song.songId
      );
      props.deleteSong(val);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Button variant="flat" onClick={handleShow}>
        <DeleteIcon style={{ color: '#979696' }} />
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
            Are you sure you want to delete <strong>{props.song.title}</strong>?
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
      const deletedSong = await Axios.post('api/playlist/deleteSong', {
        playlistId,
        songId,
      });
      return deletedSong.data;
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
          name={props.song.title}
          artist={props.song.artist}
          thumbnail={props.song.thumbnail}
          youtubeID={props.song.songId}
        />
      </div>

      <FriendListPopup friends={props.friends} itemId={props.song.songId} />

      <DeleteSongModal
        song={props.song}
        deleteSong={props.handleDelete}
        parentCallback={getModalResponse}
      />
    </div>
  );
};

PlaylistEditItem.propsType = {
  name: PropsType.string.isRequired,
};

export default PlaylistEditItem;
