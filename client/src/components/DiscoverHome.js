import React from 'react';
import { Thumbnail } from './';

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
                name={p.snippet.title}
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
            console.log(p);
            return (
              <Thumbnail
                key={p.id}
                playlistId={p.playlistId}
                firstSong={p.songs[0]}
                name={p.playlistName}
                artist={p.ownerUsername}
                thumbnail={p.thumbnail}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DiscoverHome;
