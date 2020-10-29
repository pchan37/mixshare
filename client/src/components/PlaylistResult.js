import React from 'react';
import { HorizontalThumbnail } from './';

const PlaylistResult = () => {
  return (
    <div style={{ width: '100%' }} className="d-flex flex-row mb-3">
      <HorizontalThumbnail />

      <div
        style={{ width: '100%' }}
        className="d-flex flex-row justify-content-end">
        <p>Icons</p>
      </div>
    </div>
  );
};

export default PlaylistResult;
