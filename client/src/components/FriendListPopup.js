import React, { useState } from 'react';

import { Button, Form, OverlayTrigger, Popover } from 'react-bootstrap';
import { CardGiftcard } from '@material-ui/icons';

import data from '../placeholders/data';
import SimpleUser from './SimpleUser';

function FriendListPopup() {
  const [open, updateOpen] = useState(false);
  const [selectedUser, updateSelectedUser] = useState('');

  const CardGiftPopup = (
    <Popover>
      <Popover.Content className="mr-2">
        {data.friends.map((f) => {
          return (
            <SimpleUser key={f.id} username={f.username}>
              <Button
                variant="flat"
                onClick={() => updateSelectedUser(f.username)}>
                <CardGiftcard style={{ color: '#979696' }} />
              </Button>
            </SimpleUser>
          );
        })}
      </Popover.Content>
    </Popover>
  );

  const MessagePopup = (
    <Popover>
      <Popover.Content className="mr-2">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            document.body.click();
            updateSelectedUser('');
          }}>
          <Form.Label classname="text-center">
            Attach a Message for {selectedUser}:
          </Form.Label>
          <Form.Control as="textarea" rows={3} classname="m-2" />
          <Button type="submit" classname="text-center">
            Send
          </Button>
        </Form>
      </Popover.Content>
    </Popover>
  );

  const ChooseView = () => {
    if (!(selectedUser === '')) {
      return MessagePopup;
    } else {
      return CardGiftPopup;
    }
  };

  return (
    <OverlayTrigger
      placement="left"
      // delay={{ show: 250, hide: 1000 }}
      overlay={ChooseView()}
      trigger="click"
      rootClose
      onExit={() => updateSelectedUser('')}>
      <Button variant="flat">
        <CardGiftcard style={{ color: '#979696' }} />
      </Button>
    </OverlayTrigger>
  );
}

export default FriendListPopup;
