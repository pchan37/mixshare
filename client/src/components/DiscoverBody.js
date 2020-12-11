import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';

import { Button, Container, Form } from 'react-bootstrap';

import { DiscoverHome, DiscoverSearch } from './';
import data from '../placeholders/data';

import SearchIcon from '@material-ui/icons/Search';
import { UserContext } from '../contexts';

const ChooseDisplay = (props) => {
  const [topPlaylists, updateTopPlaylists] = useState([]);

  const getTopPlaylists = async () => {
    try {
      const playlistsRes = await Axios.post(
        '/api/playlist/getTopPlaylists',
        {}
      );
      updateTopPlaylists(playlistsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTopPlaylists();
  }, []);

  if (props.query !== '') {
    return (
      <DiscoverSearch
        query={props.query}
        songResults={props.songResults}
        playlistResults={props.playlistResults}
        friends={props.friends}
      />
    );
  } else {
    return <DiscoverHome songs={props.topSongs} playlists={topPlaylists} />;
  }
};

function DiscoverBody() {
  const { currentUser } = useContext(UserContext);
  const [query, updateQuery] = useState('');
  const [playlistResults, updatePlaylistResults] = useState([]);
  const [songResults, updateSongResults] = useState([]);
  const [topSongs, updateTopSongs] = useState([]);
  const [friends, setFriends] = useState([]);

  const getFriends = async () => {
    try {
      const friends = await Axios.post('api/user/friends', {
        username: currentUser.username,
      });
      setFriends(friends.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    async function getTopSongs() {
      console.log('getting Top Songs');
      const gettingSongs = await Axios.get('/api/youtube/topSongs');
      updateTopSongs(gettingSongs.data);
    }
    getTopSongs();
    getFriends();
  }, []);

  const updateQueryAndReturn = (event) => {
    event.preventDefault();
    var enteredQuery = event.target.elements.query.value;
    if (enteredQuery !== '') {
      getPlaylistResults(enteredQuery);
      getSongResults(enteredQuery);
    }
    updateQuery(enteredQuery);
  };

  const getPlaylistResults = async (query) => {
    console.log(query);
    try {
      const playlistsRes = await Axios.get('/api/youtube/playlists', {
        params: { query },
      });
      updatePlaylistResults(playlistsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getSongResults = async (query) => {
    try {
      const songRes = await Axios.post('/api/youtube/songs', {
        query: query,
      });
      updateSongResults(songRes.data);
    } catch {
      console.error('error');
    }
  };

  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-row mb-2">
        <h2>Discover</h2>
        <Container fluid className="d-flex justify-content-end">
          <Form className="d-flex flex-row" onSubmit={updateQueryAndReturn}>
            <Form.Control name="query" type="text" placeholder="Search" />
            <span>
              <Button type="submit" variant="flat">
                <SearchIcon style={{ color: '#979696' }} />
              </Button>
            </span>
          </Form>
        </Container>
      </div>
      <ChooseDisplay
        query={query}
        songResults={songResults}
        playlistResults={playlistResults}
        topSongs={topSongs}
        friends={friends}
      />
    </div>
  );
}

export default DiscoverBody;
