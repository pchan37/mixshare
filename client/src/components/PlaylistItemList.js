import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';

import { PlaylistItem } from '.';
import { ProfileContext } from '../contexts';

const PlaylistItemList = () => {
  const { currentProfile } = useContext(ProfileContext);
  const [listOfPlaylists, updateListOfPlaylists] = useState([]);

  const getPlaylist = async () => {
    try {
      const playlistRes = await Axios.post('/api/playlist/getPlaylist', {
        username: currentProfile,
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

  return listOfPlaylists.map((p) => {
    return (
      <PlaylistItem
        key={p.playlistId}
        id={p.playlistId}
        playlistName={p.playlistName}
        owner={p.ownerUsername}
        mixtapeMode={p.mixtapeMode}
        songs={p.songs}></PlaylistItem>
    );
  });
};

export default PlaylistItemList;
