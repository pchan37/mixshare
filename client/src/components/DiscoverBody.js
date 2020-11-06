import React, { useState } from 'react';
import Axios from 'axios';

import { Button, Container, Form } from 'react-bootstrap';

import { Thumbnail } from './';
import data from '../placeholders/data';

import SearchIcon from '@material-ui/icons/Search';

function DiscoverBody() {
  const [playlists, setPlaylists] = useState([]);

  const getSearch = async (event) => {
    event.preventDefault();
    const query = event.target.elements.query.value;
    console.log(query);
    try {
      const res = await Axios.post('../api/youtube/songs', {
        query: query,
      });
      setPlaylists(res.data.playlists);
      console.log(playlists);
    } catch (err) {
      console.error(err);
    }
  };

  //const DiscoverBody = () => {
  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-row mb-2">
        <h2>Discover</h2>
        <Container fluid className="d-flex justify-content-end">
          <Form className="d-flex flex-row" onSubmit={getSearch}>
            <Form.Control name="query" type="text" placeholder="Search" />

            <Button type="submit" variant="flat">
              <SearchIcon style={{ color: '#979696' }} />
            </Button>
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
