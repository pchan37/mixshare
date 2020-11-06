import React from 'react';

import { PlaylistItem } from './';

import data from '../placeholders/data';

const PlaylistBody = () => {
  return data.playlists.map((p) => {
    return (
      <PlaylistItem
        key={p.id}
        name={p.name}
        owner={p.owner}
        songs={p.songs}></PlaylistItem>
    );
  });
};

export default PlaylistBody;
