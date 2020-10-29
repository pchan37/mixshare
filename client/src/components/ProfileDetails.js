import React from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap';
import { AccountCircle } from '@material-ui/icons';

const ProfileDetails = () => {
  return (
    <Container>
      <Row>
        <Col xs={3}>
          <AccountCircle style={{ fontSize: '200' }} />
        </Col>
        <Col class="my-auto">
          <h2>Username's Profile</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileDetails;
