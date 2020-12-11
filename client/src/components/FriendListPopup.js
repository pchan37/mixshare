import React, { useContext, useState } from 'react';
import Axios from 'axios';

import { Button, Form, OverlayTrigger, Popover } from 'react-bootstrap';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';

import PopupUser from './PopupUser';

import { UserContext } from '../contexts';

const FriendListPopup = (props) => {
  const { currentUser } = useContext(UserContext);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [response, setResponse] = useState(null);

  const mapFriends = props.friends.map((f) => {
    return (
      <PopupUser key={f.userId} username={f.username}>
        <Button
          variant="flat"
          onClick={() => {
            setSelectedFriend(f);
          }}>
          <CardGiftcardIcon style={{ color: '#979696' }} />
        </Button>
      </PopupUser>
    );
  });

  // sends both playlists and songs, difference is handled in server
  const sendGift = async (event) => {
    event.preventDefault();
    var message = event.target.elements.message.value;

    // sending song from discover page - checks if song item needs to be made
    if (props.song !== null) {
      try {
        await Axios.post('/api/gifts/createSong', {
          videoId: props.itemId,
          songItem: props.song,
        });
      } catch (err) {
        console.error(err);
      }
    }

    try {
      await Axios.post('/api/gifts/sendGift', {
        username: currentUser.username,
        targetId: selectedFriend.userId,
        giftItemId: props.itemId,
        message: message,
      });
      setSelectedFriend(null);
    } catch (err) {
      setResponse(err.response);
      console.log(err.response);
      console.error(err); //console.errer doesnt print for some reason
    }
  };

  const writeMessage = (
    <Form onSubmit={sendGift}>
      {selectedFriend !== null && (
        <Form.Label>
          Write a message to <b>{selectedFriend.username}</b>
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

  const CardGiftPopup = (
    <Popover>
      <Popover.Content className="mr-2">
        {selectedFriend !== null ? writeMessage : mapFriends}
      </Popover.Content>
    </Popover>
  );

  return (
    <OverlayTrigger
      placement="left"
      overlay={CardGiftPopup}
      trigger="click"
      rootClose
      onToggle={() => {
        setSelectedFriend(null);
      }}>
      <Button variant="flat">
        <CardGiftcardIcon style={{ color: '#979696' }} />
      </Button>
    </OverlayTrigger>
  );
};

export default FriendListPopup;
