import React from 'react';

import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { CardGiftcard, Delete } from '@material-ui/icons';
import { HorizontalThumbnail, SimpleUser } from './';

import data from '../placeholders/data';

const CardGiftPopup = (
  <Popover>
    <Popover.Content className="mr-2">
      {data.friends.map((f) => {
        return (
          <SimpleUser key={f.id} username={f.username}>
            <Button variant="flat">
              <CardGiftcard style={{ color: '#979696' }} />
            </Button>
          </SimpleUser>
        );
      })}
    </Popover.Content>
  </Popover>
);

const PlaylistEditItem = (props) => {
  return (
    <div className="d-flex flex-row mt-3">
      <div className="d-flex flex-row flex-grow-1 ml-4">
        <HorizontalThumbnail name={props.name} artist={props.artist} />
      </div>

      <OverlayTrigger
        placement="left"
        delay={{ show: 250, hide: 400 }}
        overlay={CardGiftPopup}
        trigger="click">
        <Button variant="flat">
          <CardGiftcard style={{ color: '#979696' }} />
        </Button>
      </OverlayTrigger>

      <Button variant="flat">
        <Delete style={{ color: '#979696' }} />
      </Button>
    </div>
  );
};

export default PlaylistEditItem;
