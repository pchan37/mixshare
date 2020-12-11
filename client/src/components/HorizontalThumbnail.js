import React, { useContext } from 'react';
import { Image } from 'react-bootstrap';

import { CurrentlyPlayingContext } from '../contexts';

const HorizontalThumbnail = (props) => {
  const { setCurrentlyPlaying } = useContext(CurrentlyPlayingContext);

  const defaultThumbnail =
    'https://wp-en.oberlo.com/wp-content/uploads/2019/04/image13-1-1024x576.png';

  return (
    <div style={{ minWidth: '50vw' }} className="d-flex flex-row">
      <div style={{ maxWidth: '15vw' }}>
        <Image
          onClick={() => {
            if (props.playlistId !== null && props.playlistId !== undefined) {
              if (props.songs.length !== 0) {
                setCurrentlyPlaying((prevState) => ({
                  ...prevState,
                  song: props.songs[0],
                  playlist: props.playlistId,
                  opts: {
                    ...prevState.opts,
                    playerVars: {
                      ...prevState.opts.playerVars,
                      loop: 0,
                      playlist: '',
                    },
                  },
                }));
              }
            } else {
              setCurrentlyPlaying((prevState) => ({
                ...prevState,
                song: props.youtubeID,
                opts: {
                  ...prevState.opts,
                  playerVars: {
                    ...prevState.opts.playerVars,
                    loop: 0,
                    playlist: '',
                  },
                },
              }));
            }
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
