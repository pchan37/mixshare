import React from 'react';

import { Button, Image, OverlayTrigger } from 'react-bootstrap';
import { ProfileClickPopup } from './';

const AvatarNameSmall = () => {
  return (
    <div className="d-flex flex-row p-1">
      <Image
        roundedCircle
        fluid
        src="https://fomantic-ui.com/images/wireframe/square-image.png"
      />

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
