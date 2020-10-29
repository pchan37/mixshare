import React from 'react';

import { Button, Container, Form } from 'react-bootstrap';

import { DiscoverHeader, DisplayThumbnails } from './';

const DiscoverBody = () => {
  return (
    <div className="d-flex flex-column">
      <DiscoverHeader />

      <div className="d-flex flex-column">
        <h5>Top Songs</h5>
        <div className="d-flex flex-row">
          <DisplayThumbnails />
        </div>
      </div>

      <div className="d-flex flex-column">
        <h5>Top Playlists</h5>
        <DisplayThumbnails />
      </div>
    </div>
  );
};

export default DiscoverBody;
