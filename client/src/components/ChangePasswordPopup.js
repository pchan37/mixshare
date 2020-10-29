import React from 'react';

import { Button, Form, Popover } from 'react-bootstrap';

const ChangePasswordPopup = (
  <Popover id="popover-basic">
    <Popover.Content style={{ textAlign: 'center' }}>
      <Form>
        <Form.Group>
          <Form.Control type="password" placeholder="New Password" />
        </Form.Group>
        <Form.Group>
          <Form.Control type="password" placeholder="Confirm New Password" />
        </Form.Group>
        <Button>Submit</Button>
      </Form>
    </Popover.Content>
  </Popover>
);

export default ChangePasswordPopup;
