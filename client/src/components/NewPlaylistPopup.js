import React from 'react';

import { Button, Form, Popover } from 'react-bootstrap';

const NewPlaylistPopup = (
  <Popover id="popover-basic">
    <Popover.Content style={{ textAlign: 'center' }}>
      <Form>
        <Form.Group>
          <Form.Control type="name" placeholder="Name of Playlist" />
        </Form.Group>
        <Button>Submit</Button>
      </Form>
    </Popover.Content>
  </Popover>
);

export default NewPlaylistPopup;
