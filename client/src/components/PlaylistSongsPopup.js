import React from 'react';

import { OverlayTrigger, Popover } from 'react-bootstrap';

import MenuIcon from '@material-ui/icons/Menu';

import { PopupSong } from './';

const PlaylistSongsPopup = (props) => {
  const SongsPopover = (
    <Popover>
      <Popover.Content>
        {props.songs.map((s) => (
          <PopupSong song={s} />
        ))}
      </Popover.Content>
    </Popover>
  );

  return (
    <OverlayTrigger
      placement="top"
      overlay={SongsPopover}
      rootClose
      trigger="click">
      <MenuIcon style={props.style} />
    </OverlayTrigger>
  );
};

export default PlaylistSongsPopup;
