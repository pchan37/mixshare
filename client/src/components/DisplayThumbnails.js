import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import { Thumbnail } from './';

const DisplayThumbnails = (props) => {
  return (
    <Container fluid>
      <Row md={4} lg={4}>
        <Col>
          <Thumbnail />
        </Col>
        <Col>
          <Thumbnail />
        </Col>
        <Col>
          <Thumbnail />
        </Col>
        <Col>
          <Thumbnail />
        </Col>
      </Row>
    </Container>
  );
};

export default DisplayThumbnails;
