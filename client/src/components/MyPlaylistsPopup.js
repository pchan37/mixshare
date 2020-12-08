import React, { useContext, useState, useEffect } from 'react';
import Axios from 'axios';

import { Button, OverlayTrigger, Popover } from 'react-bootstrap';

import { Add } from '@material-ui/icons';

import SimplePlaylist from './SimplePlaylist';
import { UserContext } from '../contexts';

const PlaylistsPopup = (song) => {
  const { currentUser } = useContext(UserContext);
  const [listOfPlaylists, updateListOfPlaylists] = useState([]);

  const addSongToPlaylist = async (playlistId, song) => {
    console.log('hi');
    try {
      const songRes = await Axios.post('/api/playlist/addSong', {
        playlistId,
        song,
      });
      console.log(songRes);
    } catch (err) {
      console.error(err);
    }
  };

  const getPlaylist = async () => {
    try {
      const playlistRes = await Axios.post('/api/playlist/getPlaylist', {
        username: currentUser.username,
      });
      updateListOfPlaylists(playlistRes.data);
      console.log(playlistRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  return (
    <Popover>
      <Popover.Content className="mr-2">
        <Button variant="flat">
          <Add style={{ color: '#979696', fontSize: 20 }} />
          new playlist
        </Button>
        {listOfPlaylists.map((p) => {
          return (
            <SimplePlaylist key={p.id} name={p.playlistName}>
              <Button
                variant="flat"
                onClick={() => addSongToPlaylist(p.playlistId, song)}>
                <Add style={{ color: '#979696' }} />
              </Button>
            </SimplePlaylist>
          );
        })}
      </Popover.Content>
    </Popover>
  );
};

const MyPlaylistsPopup = (props) => {
  return (
    <OverlayTrigger
      placement="left"
      delay={{ show: 250 }}
      overlay={PlaylistsPopup(props.song)}
      trigger="click"
      rootClose>
      {props.children}
    </OverlayTrigger>
  );
};

export default MyPlaylistsPopup;
