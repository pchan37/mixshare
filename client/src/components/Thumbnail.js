import React, { useContext } from 'react';
import { Image } from 'react-bootstrap';

import Axios from 'axios';

import { CurrentlyPlayingContext } from '../contexts';

const defaultThumbnail =
  'https://wp-en.oberlo.com/wp-content/uploads/2019/04/image13-1-1024x576.png';

const Thumbnail = (props) => {
  const { setCurrentlyPlaying } = useContext(CurrentlyPlayingContext);

  const incrementView = async (playlistId) => {
    try {
      await Axios.post('/api/playlist/addView', { playlistId });
    } catch (err) {
      console.error(err);
    }
  };

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
            if (props.songs.length !== 0) {
              incrementView(props.playlistId);
              setCurrentlyPlaying({
                song: props.songs[0],
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
              });
            }
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
