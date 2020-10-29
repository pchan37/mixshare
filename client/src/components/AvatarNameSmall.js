import React from 'react';

import { Image } from 'react-bootstrap';

import { AccountCircle } from '@material-ui/icons';

const AvatarNameSmall = () => {
  return (
    <div className="d-flex flex-row p-1">
      <Image
        roundedCircle
        fluid
        src="https://fomantic-ui.com/images/wireframe/square-image.png"
      />
      <div className="align-self-center m-3">
        <a href="#">Username</a>
      </div>
      <AccountCircle fluid style={{ fontSize: 60 }} />
      <div className="align-self-center m-3 pl-2">
        <label>Some User</label>
      </div>
    </div>
  );
};

export default AvatarNameSmall;
