import React from 'react';

import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { CardGiftcard } from '@material-ui/icons';

import data from '../placeholders/data';
import SimpleUser from './SimpleUser';

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

const FriendListPopup = () => {
  return (
    <OverlayTrigger
      placement="left"
      delay={{ show: 250, hide: 1000 }}
      overlay={CardGiftPopup}
      trigger="click">
      <Button variant="flat">
        <CardGiftcard style={{ color: '#979696' }} />
      </Button>
    </OverlayTrigger>
  );
};

export default FriendListPopup;
