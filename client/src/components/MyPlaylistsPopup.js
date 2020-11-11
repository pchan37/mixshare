import React from 'react';

import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { Add } from '@material-ui/icons';

import SimplePlaylist from './SimplePlaylist';
import data from '../placeholders/data';

const PlaylistsPopup = (
  <Popover>
    <Popover.Content className="mr-2">
      <Button variant="flat">
        <Add style={{ color: '#979696', fontSize: 20 }} />
        new playlist
      </Button>
      {data.playlists.map((p) => {
        return (
          <SimplePlaylist key={p.id} name={p.name}>
            <Button variant="flat">
              <Add style={{ color: '#979696' }} />
            </Button>
          </SimplePlaylist>
        );
      })}
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
