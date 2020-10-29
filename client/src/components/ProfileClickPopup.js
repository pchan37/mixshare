import React from 'react';

import { Nav, Popover } from 'react-bootstrap';

const ProfileClickPopup = (
  <Popover id="popover-basic">
    <Popover.Content>
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link href="/profile">Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item className="border-bottom">
          <Nav.Link href="/account">Manage Account</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/">Logout</Nav.Link>
        </Nav.Item>
      </Nav>
    </Popover.Content>
  </Popover>
);

export default ProfileClickPopup;
