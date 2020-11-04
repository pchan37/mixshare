import React from 'react';

import { Button, Container, Form } from 'react-bootstrap';

import { DisplayThumbnails } from './';

import SearchIcon from '@material-ui/icons/Search';

const DiscoverBody = () => {
  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-row mb-2">
        <h2>Discover</h2>
        <Container fluid className="d-flex justify-content-end">
          <Form className="d-flex flex-row">
            <Form.Control placeholder="Search" />
            <span>
              <Button href="/searchResults" variant="flat">
                <SearchIcon />
              </Button>
            </span>
          </Form>
        </Container>
      </div>

      <div className="d-flex flex-column">
        <h5>Top Songs</h5>
        <div className="d-flex flex-row">
          <DisplayThumbnails />
        </div>
      </div>

      <div className="d-flex flex-column">
        <h5>Top Playlists</h5>
        <DisplayThumbnails />
      </div>
    </div>
  );
};

export default DiscoverBody;
