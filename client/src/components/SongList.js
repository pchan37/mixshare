import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

const SongList = () => {
  return (
    <Container>
      <Row>
        <label>Song 1 by Artist 1</label>
      </Row>
      <Row>
        <label>Song 2 by Artist 2 ft Random Artist</label>
      </Row>
      <Row>
        <label>Song 3 by Artist 3 ft Random Artist 1 and Random Artist 2</label>
      </Row>
      <Row>
        <label>Song 4 by Artist 4</label>
      </Row>
      <Row>
        <label>And More ...</label>
      </Row>
    </Container>
  );
};

export default SongList;
