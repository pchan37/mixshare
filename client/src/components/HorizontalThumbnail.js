import React, { useContext } from 'react';
import Axios from 'axios';
import { Image, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { CurrentlyPlayingContext, ProfileContext } from '../contexts';

const HorizontalThumbnail = (props) => {
  const { currentlyPlaying, setCurrentlyPlaying } = useContext(
    CurrentlyPlayingContext
  );
  const { setCurrentProfile } = useContext(ProfileContext);

  const DEFAULT_THUMBNAIL =
    'https://wp-en.oberlo.com/wp-content/uploads/2019/04/image13-1-1024x576.png';

  const incrementView = async (playlistId) => {
    try {
      await Axios.post('/api/playlist/addView', { playlistId });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ minWidth: '50vw' }} className="d-flex flex-row">
      <div style={{ maxWidth: '15vw' }}>
        <Image
          onClick={() => {
            if (props.playlistId !== null && props.playlistId !== undefined) {
              if (props.songs.length !== 0) {
                console.log(props.playlistId);
                incrementView(props.playlistId);
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
              : DEFAULT_THUMBNAIL
          }
        />
      </div>

      <div className="ml-3 text-light align-self-top">
        <p>
          {props.name} <br />
          by {props.artist}
        </p>
      </div>
    </div>
  );
};

export default HorizontalThumbnail;
