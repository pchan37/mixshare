import React from 'react';

import { Tabs, Tab } from 'react-bootstrap';

import { DiscoverHeader, PlaylistResult } from './';

const PlaylistSearchBody = () => {
  return (
    <div className="d-flex flex-column">
      <DiscoverHeader />

      <Tabs className="mb-3">
        <Tab eventKey="playlists" title="Playlists" className="p-2">
          <PlaylistResult />
          <PlaylistResult />
          <PlaylistResult />
          <PlaylistResult />
        </Tab>
        <Tab eventKey="songs" title="Songs" className="p-2">
          <PlaylistResult />
          <PlaylistResult />
          <PlaylistResult />
          <PlaylistResult />
        </Tab>
      </Tabs>
    </div>
  );
};

export default PlaylistSearchBody;
