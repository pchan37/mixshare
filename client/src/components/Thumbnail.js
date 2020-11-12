import React from 'react';

import { Image } from 'react-bootstrap';

const Thumbnail = (props) => {
  return (
    <div
      className="d-flex flex-column mr-4 `menu-item ${
        props.selected ? 'active' : ''
      }`">
      <Image
        fluid
        style={{ maxWidth: '19vw' }}
        src="https://wp-en.oberlo.com/wp-content/uploads/2019/04/image13-1-1024x576.png"
      />
      <p>
        {props.name} <br /> {props.artist}
      </p>
    </div>
  );
};

export default Thumbnail;
