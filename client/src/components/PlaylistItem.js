import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { CallSplit, Edit } from '@material-ui/icons';
import FriendListPopup from './FriendListPopup';

const PlaylistItem = (props) => {
  return (
    <div className="d-flex flex-column border-bottom pb-2 mb-2">
      <div className="d-flex flex-row">
        <h4>{props.name}</h4>
      </div>
      <div className="d-flex flex-row">
        <div className="d-flex flex-row flex-grow-1">
          <Image
            fluid
            style={{ maxWidth: '20vw' }}
            src="https://wp-en.oberlo.com/wp-content/uploads/2019/04/image13-1-1024x576.png"
          />
          <div className="ml-4">
            <p>{props.songs[0]}</p>
            <p>{props.songs[1]}</p>
            <p>{props.songs[2]}</p>
            <p>{props.songs[3]}</p>
            <p>And More...</p>
          </div>
        </div>
        <div className="d-flex flex-row">
          <Button variant="flat">
            <Edit style={{ color: '#979696' }} />
          </Button>
          <Button variant="flat">
            <CallSplit style={{ color: '#979696' }} />
          </Button>
          <FriendListPopup />
        </div>
      </div>
    </div>
  );
};

export default PlaylistItem;
