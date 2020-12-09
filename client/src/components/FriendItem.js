import React, { useContext } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import { UserContext } from '../contexts';

import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { DeletePopup, User } from './';

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
      <CardGiftcardIcon style={{ color: '#979696', fontSize: 30 }} />
      <DeletePopup
        bodytext={`Remove ${props.username} from Friends?`}
        getResponse={getResponse}>
        <DeleteOutlineIcon
          style={{ color: '#979696', fontSize: 30, cursor: 'pointer' }}
        />
      </DeletePopup>
    </User>
  );
};

FriendItem.propTypes = {
  username: PropTypes.string.isRequired,
};

export default FriendItem;
