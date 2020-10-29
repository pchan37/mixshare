import React from 'react';

import { Image } from 'react-bootstrap';

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
    </div>
  );
};

export default AvatarNameSmall;
