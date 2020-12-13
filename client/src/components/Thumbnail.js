import React, { useContext } from 'react';
import { Image } from 'react-bootstrap';

import { CurrentlyPlayingContext } from '../contexts';

const defaultThumbnail =
  'https://wp-en.oberlo.com/wp-content/uploads/2019/04/image13-1-1024x576.png';

const Thumbnail = (props) => {
  const { setCurrentlyPlaying } = useContext(
    CurrentlyPlayingContext
  );

  return (
    <div className="d-flex flex-column mr-4">
      <Image
        fluid
        style={{ maxWidth: '19vw', cursor: 'pointer' }}
        src={
          props.thumbnail !== undefined && props.thumbnail !== null
            ? props.thumbnail
            : defaultThumbnail
        }
        onClick={() => {
          if (props.playlistId !== null && props.playlistId !== undefined) {
            setCurrentlyPlaying({
              song: props.firstSong,
              playlist: props.playlistId,
              repeat: false,
              shuffle: false,
              opts: {
                playerVars: {
                  controls: 1,
                  autoplay: 1,
                  loop: 0,
                  playlist: '',
                },
              },
            })
          } else {
            setCurrentlyPlaying({
              song: props.youtubeID,
              playlist: '',
              repeat: false,
              shuffle: false,
              opts: {
                playerVars: {
                  controls: 1,
                  autoplay: 1,
                  loop: 0,
                  playlist: '',
                },
              },
            });
          }
        }}
      />
      <p>
        {props.name} <br /> {props.artist}
      </p>
    </div>
  );
};

export default Thumbnail;
