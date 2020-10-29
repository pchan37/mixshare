import React from 'react';

import { SongList } from './';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { Archive, CardGiftcard } from '@material-ui/icons';

const PlaylistBody = () => {
  return (
    <Container>
      <Row class="pt-2">
        <h3>Playlist 1</h3>
      </Row>
      <Row>
        <Col xs={4}>
          <Image
            fluid
            src="https://wp-en.oberlo.com/wp-content/uploads/2019/04/image13-1-1024x576.png"
          />
        </Col>
        <Col class="my-auto pl-4">
          <SongList />
        </Col>
        <Col class="my-auto">
          <Button>
            <Archive />
          </Button>
          <Button>
            <CardGiftcard />
          </Button>
        </Col>
      </Row>
      <Row class="pt-2">
        <h3>Playlist 2</h3>
      </Row>
      <Row>
        <Col xs={4}>
          <Image
            fluid
            src="https://wp-en.oberlo.com/wp-content/uploads/2019/04/image13-1-1024x576.png"
          />
        </Col>
        <Col class="my-auto pl-4">
          <SongList />
        </Col>
        <Col class="my-auto">
          <Button>
            <Archive />
          </Button>
          <Button>
            <CardGiftcard />
          </Button>
        </Col>
      </Row>
      <Row class="pt-2">
        <h3>Playlist 3</h3>
      </Row>
      <Row>
        <Col xs={4}>
          <Image
            fluid
            src="https://wp-en.oberlo.com/wp-content/uploads/2019/04/image13-1-1024x576.png"
          />
        </Col>
        <Col class="my-auto pl-4">
          <SongList />
        </Col>
        <Col class="my-auto">
          <Button>
            <Archive />
          </Button>
          <Button>
            <CardGiftcard />
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaylistBody;
