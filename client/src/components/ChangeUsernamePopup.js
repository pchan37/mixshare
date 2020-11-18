import React from 'react';

import { Button, Form, Popover } from 'react-bootstrap';

const handleClick = (event) => {
  event.preventDefault();
  var newName = event.target.elements.newName.value;
  console.log(newName);
};

const ChangeUsernamePopup = (
  <Popover id="popover-basic">
    <Popover.Content style={{ textAlign: 'center' }}>
      <Form>
        <Form.Group>
          <Form.Control
            type="username"
            name="newName"
            placeholder="Enter New Username"
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </Popover.Content>
  </Popover>
);

export default ChangeUsernamePopup;
