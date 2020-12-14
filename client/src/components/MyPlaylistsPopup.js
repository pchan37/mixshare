import React, { useContext, useState, useEffect } from 'react';
import Axios from 'axios';

import { Button, Form, OverlayTrigger, Popover } from 'react-bootstrap';

import { Add } from '@material-ui/icons';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';

import SimplePlaylist from './SimplePlaylist';
import { UserContext } from '../contexts';

const iconStyle = { color: '#979696', cursor: 'pointer' };

const PlaylistsPopup = (gift, song, friend, friendname) => {
  const { currentUser } = useContext(UserContext);
  const [listOfPlaylists, updateListOfPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [response, setResponse] = useState(null);

  const addSongToPlaylist = async (playlistId, song) => {
    try {
      const songRes = await Axios.post('/api/playlist/addSong', {
        playlistId,
        song,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getPlaylist = async () => {
    try {
      const playlistRes = await Axios.post('/api/playlist/getPlaylist', {
        username: currentUser.username,
      });
      updateListOfPlaylists(playlistRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  const playlists = (
    <>
      {listOfPlaylists.length !== 0 ? (
        listOfPlaylists.map((p) => {
          return (
            <SimplePlaylist key={p.id} name={p.playlistName}>
              {gift ? (
                <Button
                  variant="flat"
                  onClick={() => {
                    setSelectedPlaylist(p.playlistId);
                  }}>
                  <CardGiftcardIcon style={iconStyle} />
                </Button>
              ) : (
                <Button
                  variant="flat"
                  onClick={() => {
                    addSongToPlaylist(p.playlistId, song);
                  }}>
                  <Add style={iconStyle} />
                </Button>
              )}
            </SimplePlaylist>
          );
        })
      ) : (
        <p>No Playlists to Display</p>
      )}
    </>
  );

  const sendGift = async (event) => {
    event.preventDefault();
    var message = event.target.elements.message.value;

    try {
      await Axios.post('/api/gifts/sendGift', {
        username: currentUser.username,
        targetId: friend,
        giftItemId: selectedPlaylist,
        message: message,
      });
      setSelectedPlaylist('');
    } catch (err) {
      setResponse(err.response);
      console.log(err.response);
      console.error(err); //console.error doesnt print for some reason
    }
  };

  const writeMessage = (
    <Form onSubmit={sendGift}>
      {selectedPlaylist !== null && (
        <Form.Label>
          Write a message to <b>{friendname}</b>
        </Form.Label>
      )}
      <Form.Control
        as="textarea"
        name="message"
        placeholder="Say something here..."
      />
      {response !== null && (
        <Form.Text>{response.data.statusMessage}</Form.Text>
      )}
      <Button className="mt-2" variant="outline-primary" type="submit">
        Send
      </Button>
    </Form>
  );

  return (
    <Popover>
      <Popover.Content className="mr-2">
        {selectedPlaylist !== '' ? writeMessage : playlists}
      </Popover.Content>
    </Popover>
  );
};

const MyPlaylistsPopup = (props) => {
  return (
    <OverlayTrigger
      placement="left"
      delay={{ show: 250 }}
      overlay={PlaylistsPopup(
        props.gift,
        props.song,
        props.friend,
        props.friendname
      )}
      trigger="click"
      rootClose>
      {props.children}
    </OverlayTrigger>
  );
};

export default MyPlaylistsPopup;
