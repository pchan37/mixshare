import React from 'react';

import { Form, Popover } from 'react-bootstrap';

const ChangeProfilePicPopup = (
  <Popover id="popover-basic">
    <Popover.Content>
      <Form>
        <Form.Group class="p-1">
          <Form.File id="profile-pic" label="Select a Profile Picture" />
        </Form.Group>
      </Form>
    </Popover.Content>
  </Popover>
);

export default ChangeProfilePicPopup;
