import React from 'react';

import { Button, Form, Tabs, Tab } from 'react-bootstrap';

import { GiftItem } from './';

import data from '../placeholders/data';
import { CardGiftcard, SaveAlt } from '@material-ui/icons';

const GiftBody = () => {
  return (
    <div>
      <div
        className="d-flex flex-row mb-3"
        style={{ justifyContent: 'space-between' }}>
        <h2>Gifts</h2>
        <div className="d-flex flex-row" style={{ alignItems: 'center' }}>
          <span className="align-self-top mr-3 col-lg-auto">Sort by:</span>
          <Form.Control as="select">
            <option>From Friends</option>
            <option>From Anyone</option>
          </Form.Control>
        </div>
      </div>

      <Tabs className="mb-3">
        <Tab eventKey="gifts" title="Playlists" className="p-2">
          {data.playlistRecommendations.map((p) => {
            return (
              <GiftItem
                key={p.id}
                name={p.name}
                artist={p.artist}
                gifter={p.gifter}
                message={p.message}>
                <Button variant="flat">
                  <SaveAlt style={{ color: '#979696' }} />
                </Button>
              </GiftItem>
            );
          })}
        </Tab>
        <Tab eventKey="songRecs" title="Song Recommendations" className="p-2">
          {data.songRecommendations.map((s) => {
            return (
              <GiftItem
                key={s.id}
                name={s.name}
                artist={s.artist}
                gifter={s.gifter}
                message={s.message}>
                <Button variant="flat">
                  <CardGiftcard style={{ color: '#979696' }} />
                </Button>
              </GiftItem>
            );
          })}
        </Tab>
      </Tabs>
    </div>
  );
};

export default GiftBody;
