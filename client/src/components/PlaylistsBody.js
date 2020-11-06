import React from 'react';

import { Button } from 'react-bootstrap';
import { CallSplit, CardGiftcard } from '@material-ui/icons';
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
