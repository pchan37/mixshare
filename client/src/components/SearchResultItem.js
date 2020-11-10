import React from 'react';
import { HorizontalThumbnail } from '.';

const SearchResultItem = (props) => {
  return (
    <div style={{ width: '100%' }} className="d-flex flex-row mb-3">
      <HorizontalThumbnail name={props.name} artist={props.artist} />

      <div
        style={{ width: '100%' }}
        className="d-flex flex-row justify-content-end">
        {props.children}
      </div>
    </div>
  );
};

export default SearchResultItem;