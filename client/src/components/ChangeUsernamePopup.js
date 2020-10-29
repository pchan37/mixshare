import React from 'react';

import { Button, Form, Popover } from 'react-bootstrap';

const ChangeUsernamePopup = (
  <Popover id="popover-basic">
    <Popover.Content style={{ textAlign: 'center' }}>
      <Form>
        <Form.Group>
          <Form.Control type="username" placeholder="Enter New Username" />
        </Form.Group>
        <Button>Submit</Button>
      </Form>
    </Popover.Content>
  </Popover>
);

export default ChangeUsernamePopup;
