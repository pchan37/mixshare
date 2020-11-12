import React, { useState } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { Button } from 'react-bootstrap';
import { Thumbnail } from './';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';

// arrow buttons
const ArrowLeft = (
  <Button variant="flat" className="arrow-back">
    <ArrowBackIos />
  </Button>
);
const ArrowRight = (
  <Button variant="flat" className="arrow-next">
    <ArrowForwardIos />
  </Button>
);

const DiscoverHome = (props) => {
  const [songSelected, updateSongSelected] = useState(props.songs[0].id);
  const [playlistSelected, updatePlaylistSelected] = useState(
    props.playlists[0].id
  );

  const onSongSelect = (key) => {
    updateSongSelected(key);
  };

  const onPlaylistSelect = (key) => {
    updatePlaylistSelected(key);
  };

  return (
    <div>
      <div className="d-flex flex-column">
        <h5>Top Songs</h5>
        <ScrollMenu
          data={props.songs.map((p) => {
            return (
              <Thumbnail key={p.id} name={p.name} artist={p.artist}></Thumbnail>
            );
          })}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={songSelected}
          onSelect={onSongSelect}
        />
      </div>

      <div className="d-flex flex-column">
        <h5>Top Playlists</h5>
        <ScrollMenu
          data={props.playlists.map((p) => {
            return (
              <Thumbnail key={p.id} name={p.name} artist={p.owner}></Thumbnail>
            );
          })}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={playlistSelected}
          onSelect={onPlaylistSelect}
        />
      </div>
    </div>
  );
};

export default DiscoverHome;
