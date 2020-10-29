import React from 'react';

import { Button, Image, OverlayTrigger } from 'react-bootstrap';
import { ProfileClickPopup } from './';
import { AccountCircle } from '@material-ui/icons';

const AvatarNameSmall = () => {
  return (
    <div className="d-flex flex-row p-1">
      <AccountCircle fluid style={{ fontSize: 50 }} />
      <div className="align-self-center m-2">
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={ProfileClickPopup}
          trigger="click">
          <Button variant="link">Username</Button>
        </OverlayTrigger>
      </div>
    </div>
  );
};

export default AvatarNameSmall;
