import React from 'react';
import PropTypes from 'prop-types';

import { CardGiftcard, DeleteOutline } from '@material-ui/icons';
import { User } from './';

const FriendItem = (props) => {
  return (
    <User username={props.username}>
      <CardGiftcard style={{ color: '#979696', fontSize: 40 }} />
      <DeleteOutline style={{ color: '#979696', fontSize: 40 }} />
    </User>
  );
};

FriendItem.propTypes = {
  username: PropTypes.string.isRequired,
};

export default FriendItem;
