import React from 'react';
import { HorizontalThumbnail } from '.';

const SearchResultItem = (props) => {
  return (
    <div style={{ width: '100%' }} className="d-flex flex-row mb-3">
      <HorizontalThumbnail
        youtubeID={props.youtubeID}
        name={props.name}
        artist={props.artist}
        thumbnail={props.thumbnail}
        playlistId={props.playlistId}
        songs={props.songs}
      />

      <div
        style={{ width: '100%' }}
        className="d-flex flex-row justify-content-end">
        {props.children}
      </div>
    </div>
  );
};

export default SearchResultItem;
