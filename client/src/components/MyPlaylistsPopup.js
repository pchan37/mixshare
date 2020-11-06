import React from 'react';

import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';

import data from '../placeholders/data';
import SimpleUser from './SimpleUser';
import SearchResultItem from './SearchResultItem';

const PlaylistsPopup = (
  <Popover>
    <Popover.Content className="mr-2">
      <p>Work in Progress</p>
    </Popover.Content>
  </Popover>
);

const MyPlaylistsPopup = (props) => {
  return (
    <OverlayTrigger
      placement="left"
      delay={{ show: 250, hide: 1000 }}
      overlay={PlaylistsPopup}
      trigger="click">
      {props.children}
    </OverlayTrigger>
  );
};

export default MyPlaylistsPopup;
