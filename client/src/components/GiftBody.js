import React from 'react';

import { Tabs, Tab } from 'react-bootstrap';

import { GiftItem } from './';

const GiftBody = () => {
  return (
    <div>
      <div className="d-flex flex-row mb-3">
        <h2 className="d-flex flex-row flex-grow-1">Gifts</h2>
        <div className="d-flex flex-row">
          <p>Sort By:</p>
        </div>
      </div>

      <Tabs className="mb-3">
        <Tab eventKey="gifts" title="Playlists" className="p-2">
          <GiftItem />
          <GiftItem />
          <GiftItem />
          <GiftItem />
        </Tab>
        <Tab eventKey="songRecs" title="Song Recommendations" className="p-2">
          <GiftItem />
          <GiftItem />
          <GiftItem />
          <GiftItem />
        </Tab>
      </Tabs>
    </div>
  );
};

export default GiftBody;
