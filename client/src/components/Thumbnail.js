import React from 'react';

import { Image } from 'react-bootstrap';

const Thumbnail = () => {
  return (
    <div className="d-flex flex-column">
      <Image
        fluid
        src="https://wp-en.oberlo.com/wp-content/uploads/2019/04/image13-1-1024x576.png"
      />
      <p>
        Name of video <br /> Name of Creator
      </p>
    </div>
  );
};

export default Thumbnail;
