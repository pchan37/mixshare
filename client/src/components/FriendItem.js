import React from 'react';

import { Container, Row, Button, Col } from 'react-bootstrap';
import { CardGiftcard, DeleteOutline } from '@material-ui/icons';

const FriendItem = () => {
  return (
    <Container>
      <Row>
        <Col>
          <AvatarNameSmall />
        </Col>
        <Col class="my-auto">
          <Button style={{ height: '40px' }}>View Profile</Button>
          <Button>
            <CardGiftcard />
          </Button>
          <Button>
            <DeleteOutline />
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default FriendItem;
