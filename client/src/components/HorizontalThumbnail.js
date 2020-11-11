import React from 'react';
import { Image } from 'react-bootstrap';

const HorizontalThumbnail = (props) => {
  return (
    <div style={{ minWidth: '50vw' }} className="d-flex flex-row">
      <div style={{ maxWidth: '15vw' }}>
        <Image fluid src={props.thumbnail} />
      </div>

      <div className="ml-3 align-self-top">
        <p>
          {props.name} <br />
          by {props.artist}
        </p>
      </div>
    </div>
  );
};

export default HorizontalThumbnail;
