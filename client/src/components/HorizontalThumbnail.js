import React, { useContext } from 'react';
import { Image } from 'react-bootstrap';

import { CurrentlyPlayingContext } from '../contexts';

const HorizontalThumbnail = (props) => {
  const { currentlyPlaying, setCurrentlyPlaying } = useContext(
    CurrentlyPlayingContext
  );

  return (
    <div style={{ minWidth: '50vw' }} className="d-flex flex-row">
      <div style={{ maxWidth: '15vw' }}>
        <Image
          onClick={() => {
            console.log(currentlyPlaying);
            setCurrentlyPlaying({ song: props.ytID, playlist: '' });
            console.log(currentlyPlaying);
          }}
          fluid
          src={props.thumbnail}
        />
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
