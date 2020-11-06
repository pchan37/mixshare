import React from 'react';
import { Button, Container, Form, Tabs, Tab } from 'react-bootstrap';
import Axios from 'axios';
import { FriendListPopup, MyPlaylistsPopup, SearchResultItem } from '.';
import AddIcon from '@material-ui/icons/Add';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import SearchIcon from '@material-ui/icons/Search';
import data from '../placeholders/data';
var query = sessionStorage.getItem('query');
var songResults = JSON.parse(sessionStorage.getItem('songResults'));
var playlistResults = JSON.parse(sessionStorage.getItem('playlistResults'));
console.log(query);

const updateQueryAndReturn = (event) => {
  event.preventDefault();
  const newQuery = event.target.elements.query.value;
  if (!(newQuery === '')) {
    sessionStorage.setItem('query', newQuery);
    query = sessionStorage.getItem('query');
  }

  getPlaylistResults();
  getSongResults();

  window.location.href = 'http://localhost:3000/searchResults';
};

const getPlaylistResults = async () => {
  console.log(query);
  try {
    const playlistsRes = await Axios.post('/api/youtube/playlists', {
      query: query,
    });
    sessionStorage.setItem(
      'playlistResults',
      JSON.stringify(playlistsRes.data)
    );
  } catch {
    console.log('error');
  }
};

const getSongResults = async () => {
  try {
    const songRes = await Axios.post('/api/youtube/songs', {
      query: query,
    });
    console.log(songRes.data);
    console.log('test');
    sessionStorage.setItem('songResults', JSON.stringify(songRes.data));
    console.log(JSON.parse(sessionStorage.getItem('songResults')));
  } catch {
    console.error('error');
  }
};

const SearchResultBody = (props) => {
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

      <h5>Search results for: {query}</h5>
      <Tabs>
        <Tab eventKey="playlistsSearch" title="Playlists" className="p-3">
          {playlistResults.map((p) => {
            return (
              <SearchResultItem key={p.id} name={p.name} artist={p.owner}>
                <MyPlaylistsPopup>
                  <Button variant="flat">
                    <AddIcon style={{ color: '#979696' }} />
                  </Button>
                </MyPlaylistsPopup>

                <FriendListPopup />
              </SearchResultItem>
            );
          })}
        </Tab>
        <Tab eventKey="songsSearch" title="Songs" className="p-3">
          {songResults.map((p) => {
            return (
              <SearchResultItem key={p.id} name={p.name} artist={p.artist}>
                <MyPlaylistsPopup>
                  <Button variant="flat">
                    <AddIcon style={{ color: '#979696' }} />
                  </Button>
                </MyPlaylistsPopup>

                <FriendListPopup />
              </SearchResultItem>
            );
          })}
        </Tab>
      </Tabs>
    </div>
  );
};

export default SearchResultBody;
