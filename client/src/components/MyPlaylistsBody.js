import React from 'react';

import { Add } from '@material-ui/icons';
import { PlaylistsBody } from '.';

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
          <Add style={{ color: '#979696', fontSize: 20 }} />
          new playlist
        </div>
      </div>
      <PlaylistsBody />
    </>
  );
};

export default MyPlaylistsBody;
