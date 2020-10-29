import React from 'react';

import { Button, Container, Form } from 'react-bootstrap';

import { DisplayThumbnails } from './';

const DiscoverHeader = () => {
  return (
    <div className="d-flex flex-row mb-2">
      <h2>Discover</h2>
      <Container fluid className="d-flex justify-content-end">
        <Form className="d-flex flex-row">
          <Form.Control placeholder="Search" />
          <span>
            <Button href="/search">Search</Button>
          </span>
        </Form>
      </Container>
    </div>
  );
};

export default DiscoverHeader;
