import React from 'react';
import { Thumbnail } from './';

// TODO: move to another file
// decodes HTML characters from youtube search results
function decodeHtml(text) {
  var txt = document.createElement('textarea');
  txt.innerHTML = text;
  return txt.value;
}

const DiscoverHome = (props) => {
  return (
    <div>
      <div className="d-flex flex-column">
        <h5>Top Songs</h5>
        <div className="d-flex flex-row">
          {props.songs.map((p) => {
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
        </div>
      </div>

      <div className="d-flex flex-column">
        <h5>Top Playlists</h5>
        <div className="d-flex flex-row">
          {props.playlists.map((p) => {
            return (
              <Thumbnail key={p.id} name={p.name} artist={p.owner}></Thumbnail>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DiscoverHome;
