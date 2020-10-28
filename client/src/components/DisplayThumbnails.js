import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import { Thumbnail } from './';

function generate(num) {
  const thumbnails = <Row lg={4} md={4}></Row>;

  num = parseInt(num);
  const count = 0;

  while (count < num) {
    thumbnails.children(<Thumbnail />);
    count += 1;
  }

  return thumbnails;
}

//{generate(props.num)}

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
