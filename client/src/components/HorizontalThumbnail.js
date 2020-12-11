import React, { useContext } from 'react';
import { Image, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { CurrentlyPlayingContext, ProfileContext } from '../contexts';

const HorizontalThumbnail = (props) => {
  const { currentlyPlaying, setCurrentlyPlaying } = useContext(
    CurrentlyPlayingContext
  );
  const { setCurrentProfile } = useContext(ProfileContext);

  const currentlyPlayingCopy = { ...currentlyPlaying };

  const defaultThumbnail =
    'https://wp-en.oberlo.com/wp-content/uploads/2019/04/image13-1-1024x576.png';

  return (
    <div style={{ minWidth: '50vw' }} className="d-flex flex-row">
      <div style={{ maxWidth: '15vw' }}>
        <Image
          onClick={() => {
            currentlyPlayingCopy.song = props.youtubeID;
            currentlyPlayingCopy.opts.playerVars.loop = 0;
            currentlyPlayingCopy.opts.playerVars.playlist = '';
            setCurrentlyPlaying(currentlyPlayingCopy);
          }}
          style={{ cursor: 'pointer' }}
          fluid
          src={
            props.thumbnail !== undefined && props.thumbnail !== null
              ? props.thumbnail
              : defaultThumbnail
          }
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
