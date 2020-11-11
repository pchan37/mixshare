import React, { useState } from 'react';
import Axios from 'axios';

import { Button, Container, Form } from 'react-bootstrap';

import { DiscoverHome, DiscoverSearch, Thumbnail } from './';
import data from '../placeholders/data';

import SearchIcon from '@material-ui/icons/Search';

const ChooseDisplay = (props) => {
  console.log(props);
  if (!(props.query === '')) {
    return (
      <DiscoverSearch
        query={props.query}
        songResults={props.songResults}
        playlistResults={props.playlistResults}
      />
    );
  } else {
    return <DiscoverHome songs={data.songs} playlists={data.playlists} />;
  }
};

function DiscoverBody() {
  const [query, updateQuery] = useState('');
  const [playlistResults, updatePlaylistResults] = useState([]);
  const [songResults, updateSongResults] = useState([]);

  const updateQueryAndReturn = (event) => {
    event.preventDefault();
    var enteredQuery = event.target.elements.query.value;
    if (!(enteredQuery === '')) {
      getPlaylistResults(enteredQuery);
      getSongResults(enteredQuery);
    }
    updateQuery(enteredQuery);
  };

  const getPlaylistResults = async (query) => {
    console.log(query);
    try {
      const playlistsRes = await Axios.post('/api/youtube/playlists', {
        query: query,
      });
      updatePlaylistResults(playlistsRes.data);
    } catch {
      console.log('error');
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
      />
    </div>
  );
}

export default DiscoverBody;
