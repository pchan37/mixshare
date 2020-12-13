import React, { useContext } from 'react';
import Axios from 'axios';
import { Button, Image } from 'react-bootstrap';
import { Delete } from '@material-ui/icons';
import { DeletePopup } from './';

import { CurrentlyPlayingContext } from '../contexts';

const GiftItem = (props) => {
  const { setCurrentlyPlaying } = useContext(CurrentlyPlayingContext);

  async function getResponse(value) {
    if (value) {
      props.removeGift();
    }
  }

  const incrementView = async (playlistId) => {
    try {
      await Axios.post('/api/playlist/addView', { playlistId });
    } catch (err) {
      console.error(err)
    }
  };

  return (
    <>
      <div className="d-flex flex-row border-bottom pb-2 mb-2">
        <div className="d-flex flex-row flex-grow-1">
          <div className="d-flex flex-column">
            <p>
              <b>{props.gifter}</b> has sent you a gift: <b>{props.name}</b> by{' '}
              <b>{props.artist}</b>
            </p>
            <div className="ml-2" style={{ color: 'gray' }}>
              {props.gifter} says: {props.message}
            </div>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center">
          <Image
            fluid
            style={{ maxWidth: '10vw', cursor: 'pointer' }}
            src={props.thumbnail}
            onClick={() => {
              console.log(props.songId);
              if (props.playlistId !== null && props.playlistId !== undefined) {
                incrementView(props.playlistId);
                setCurrentlyPlaying((prevState) => ({
                  ...prevState,
                  song: props.songId,
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
              } else {
                setCurrentlyPlaying((prevState) => ({
                  ...prevState,
                  song: props.songId,
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
          />
          {props.children}
          <DeletePopup
            bodytext="Are you sure you want to delete this gift?"
            getResponse={getResponse}>
            <Button variant="flat">
              <Delete style={{ color: '#979696' }} />
            </Button>
          </DeletePopup>
        </div>
      </div>
    </>
  );
};

export default GiftItem;
