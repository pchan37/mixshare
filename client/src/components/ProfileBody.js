import React from 'react';

import { Row } from 'react-bootstrap';
import { ProfileDetails, PlaylistItemList } from './';

const ProfileBody = () => {
  return (
    <div className="d-flex flex-column">
      <Row>
        <ProfileDetails />
      </Row>
      <Row className="d-flex flex-column">
        <PlaylistItemList />
      </Row>
    </div>
  );
};

export default ProfileBody;
