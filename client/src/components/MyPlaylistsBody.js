import React from 'react';

import { Button, OverlayTrigger } from 'react-bootstrap';
import { Add } from '@material-ui/icons';
import { PlaylistsBody, NewPlaylistPopup } from './';

const MyPlaylistsBody = () => {
  return (
    <>
      <div
        className="d-flex flex-row mb-2"
        style={{ justifyContent: 'space-between' }}>
        <h2 className="col-lg-auto" href="/edit">
          My Playlists
        </h2>
        <div className="d-flex flex-row" style={{ alignItems: 'center' }}>
          <OverlayTrigger
            placement="left"
            delay={{ show: 250, hide: 400 }}
            overlay={NewPlaylistPopup}
            trigger="click">
            <Button variant="flat">
              <Add style={{ color: '#979696', fontSize: 20 }} />
              new playlist
            </Button>
          </OverlayTrigger>
        </div>
      </div>
      <PlaylistsBody />
    </>
  );
};

export default MyPlaylistsBody;
