import React, { useContext } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import { UserContext } from '../contexts';

import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { DeletePopup, MyPlaylistsPopup, User } from './';

const iconStyle = { color: '#979696', cursor: 'pointer', fontSize: 30 };

const FriendItem = (props) => {
  const { currentUser } = useContext(UserContext);

  async function getResponse(value) {
    if (value) {
      try {
        await Axios.post('api/user/removeFriend', {
          unfriend: props.userId,
          currUsername: currentUser.username,
        });
        props.updateFriends();
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <User username={props.username}>
      <MyPlaylistsPopup
        gift={true}
        friend={props.userId}
        friendname={props.username}>
        <CardGiftcardIcon style={iconStyle} />
      </MyPlaylistsPopup>
      <DeletePopup
        bodytext={`Remove ${props.username} from Friends?`}
        getResponse={getResponse}>
        <DeleteOutlineIcon style={iconStyle} />
      </DeletePopup>
    </User>
  );
};

FriendItem.propTypes = {
  username: PropTypes.string.isRequired,
};

export default FriendItem;
