import React from 'react';

import { Button, Popover } from 'react-bootstrap';

const DeleteAccountPopup = (
  <Popover id="popover-basic">
    <Popover.Content style={{ textAlign: 'center' }}>
      <h4>Confirm Deletion</h4>
      <label>Are you sure you want to delete your account?</label>
      <Button>Yes</Button>
      <span class="px-3"></span>
      <Button>No</Button>
    </Popover.Content>
  </Popover>
);

export default DeleteAccountPopup;
