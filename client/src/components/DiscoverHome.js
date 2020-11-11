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
              <Thumbnail key={p.id} name={p.name} artist={p.artist}></Thumbnail>
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
