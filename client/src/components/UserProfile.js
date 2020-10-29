import React from 'react';

import { Container, Row } from 'react-bootstrap';
import { ProfileDetails, PlaylistsBody } from './';

const UserProfile = () => {
  return (
    <Container>
      <Row>
        <ProfileDetails />
      </Row>
      <Row>
        <PlaylistsBody />
      </Row>
    </Container>
  );
};

export default UserProfile;
