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

// TODO: move to another file
// decodes HTML characters from youtube search results
function decodeHtml(text) {
  var txt = document.createElement('textarea');
  txt.innerHTML = text;
  return txt.value;
}

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
              <Thumbnail
                key={p.id}
                youtubeID={p.id}
                name={decodeHtml(p.snippet.title)}
                artist={p.snippet.channelTitle}
                thumbnail={p.snippet.thumbnails.medium.url}
              />
            );
          })}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={songSelected}
          onSelect={onSongSelect}
          wheel={false}
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
          wheel={false}
        />
      </div>
    </div>
  );
};

export default DiscoverHome;
