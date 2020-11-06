import React, { useState } from 'react';
import Axios from 'axios';

import { Button, Container, Form } from 'react-bootstrap';

import { Thumbnail } from './';
import data from '../placeholders/data';

import SearchIcon from '@material-ui/icons/Search';

function DiscoverBody() {
  const getPlaylistResults = async (event) => {
    event.preventDefault();
    const query = event.target.elements.query.value;
    console.log(query);
    if (!(query === '')) {
      sessionStorage.setItem('query', query);
      try {
        const playlistsRes = await Axios.post('/api/youtube/playlists', {
          query: query,
        });
        sessionStorage.setItem(
          'playlistResults',
          JSON.stringify(playlistsRes.data)
        );
        window.location.href = 'http://localhost:3000/searchResults';
      } catch {
        console.log('error');
      }
    }
  };

  //const DiscoverBody = () => {
  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-row mb-2">
        <h2>Discover</h2>
        <Container fluid className="d-flex justify-content-end">
          <Form className="d-flex flex-row" onSubmit={getPlaylistResults}>
            <Form.Control name="query" type="text" placeholder="Search" />
            <span>
              <Button type="submit" variant="flat">
                <SearchIcon style={{ color: '#979696' }} />
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
    </div>
  );
  //};
}

export default DiscoverBody;
