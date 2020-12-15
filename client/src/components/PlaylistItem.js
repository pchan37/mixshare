import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';

import { Button, Image } from 'react-bootstrap';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import { ProfileContext, UserContext } from '../contexts';

const PlaylistItem = (props) => {
  const { currentProfile } = useContext(ProfileContext);
  const { currentUser } = useContext(UserContext);
  const [listOfSongs, updateListOfSongs] = useState([]);
  const DEFAULT_THUMBNAIL =
    'https://wp-en.oberlo.com/wp-content/uploads/2019/04/image13-1-1024x576.png';
  const [thumbnail, updateThumbnail] = useState('');

  const getSongs = async () => {
    try {
      const songRes = await Axios.post('/api/song/getSongs', {
        songIds: props.songs.slice(0, 4),
      });
      updateListOfSongs(songRes.data);
      if (songRes.data.length !== 0) updateThumbnail(songRes.data[0].thumbnail);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getSongs();
  }, []);

  const forkPlaylist = async (playlist) => {
    try {
      const forkRes = await Axios.post('/api/playlist/forkPlaylist', {
        username: currentUser.username,
        playlist,
      });
      console.log(forkRes);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="d-flex flex-column bg-dark p-3 m-2">
      <div className="d-flex flex-row">
        <h4>{props.playlistName}</h4>
      </div>
      <div className="d-flex flex-row">
        <div className="d-flex flex-row flex-grow-1">
          <Image
            fluid
            style={{ maxWidth: '20vw' }}
            src={thumbnail !== '' ? thumbnail : DEFAULT_THUMBNAIL}
          />
          <div className="ml-4">
            {listOfSongs.map((s) => {
              return <p className="text-white">{s.title}</p>;
            })}
            {props.songs.length > 4 && <p>And More...</p>}
          </div>
        </div>
        <div className="d-flex flex-row">
          <Button
            variant="flat"
            disabled={currentProfile === currentUser.username ? true : false}
            onClick={() => forkPlaylist(props)}>
            <CallSplitIcon style={{ color: '#979696' }} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistItem;
