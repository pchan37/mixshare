import React from 'react';

import { Container, Row } from 'react-bootstrap';
import { ProfileDetails, PlaylistItemList } from './';

const UserProfile = () => {
  return (
    <Container>
      <Row>
        <ProfileDetails />
      </Row>
      <Row>
        <PlaylistItemList />
      </Row>
    </Container>
  );
};

export default UserProfile;
