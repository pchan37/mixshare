import React, { useState } from 'react';
import Axios from 'axios';

import { Button, Container, Form } from 'react-bootstrap';

import { DiscoverHome, DiscoverSearch } from './';
import data from '../placeholders/data';

import { Search } from '@material-ui/icons';

const ChooseDisplay = (props) => {
  if (props.query !== '') {
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
    if (enteredQuery !== '') {
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
    } catch (err) {
      console.error(`Got an error while retrieving songs results: ${err}`);
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
                <Search style={{ color: '#979696' }} />
              </Button>
            </span>
          </Form>
        </Container>
      </div>
      <div className="d-flex flex-column">
        <h5>Top Songs</h5>
        <div className="d-flex flex-row">
          {data.songs.map((p) => {
            return (
              <Thumbnail key={p.id} name={p.name} artist={p.artist}></Thumbnail>
            );
          })}
        </div>
      </div>

      <div className="d-flex flex-column">
        <h5>Top Playlists</h5>
        <div className="d-flex flex-row">
          {data.playlists.map((p) => {
            return (
              <Thumbnail key={p.id} name={p.name} artist={p.owner}></Thumbnail>
            );
          })}
        </div>
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
