import React from 'react';

import { Button, OverlayTrigger } from 'react-bootstrap';
import { ProfileClickPopup } from './';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const AvatarNameSmall = () => {
  return (
    <div className="d-flex flex-row p-1">
      <AccountCircleIcon fluid style={{ fontSize: 50 }} />
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
