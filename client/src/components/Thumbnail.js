import React, { useContext } from 'react';
import { Image } from 'react-bootstrap';

import { CurrentlyPlayingContext } from '../contexts';

const DEFAULT_THUMBNAIL =
  'https://wp-en.oberlo.com/wp-content/uploads/2019/04/image13-1-1024x576.png';

const textStyle = { color: 'white' };

const Thumbnail = (props) => {
  const { currentlyPlaying, setCurrentlyPlaying } = useContext(
    CurrentlyPlayingContext
  );
  const currentlyPlayingCopy = { ...currentlyPlaying };

  return (
    <div className="d-flex flex-column mr-3 bg-dark p-2">
      <Image
        fluid
        style={{ maxWidth: '15vw', cursor: 'pointer' }}
        src={
          props.thumbnail !== undefined && props.thumbnail !== null
            ? props.thumbnail
            : DEFAULT_THUMBNAIL
        }
        onClick={() => {
          currentlyPlayingCopy.song = props.youtubeID;
          currentlyPlayingCopy.opts.playerVars.loop = 0;
          currentlyPlayingCopy.opts.playerVars.playlist = '';
          setCurrentlyPlaying(currentlyPlayingCopy);
        }}
      />
      <p className="mt-1" style={textStyle}>
        {props.name} <br /> {props.artist}
      </p>
    </div>
  );
};

export default Thumbnail;
