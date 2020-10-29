import React from 'react';

import { Container } from 'react-bootstrap';
import { AccountCircle } from '@material-ui/icons';

const ProfileDetails = () => {
  return (
    <Container>
      <div className="d-flex flex-row" style={{ alignItems: 'center' }}>
        <AccountCircle style={{ color: '#979696', fontSize: 200 }} />
        <h2>Username's Profile</h2>
      </div>
    </Container>
  );
};

export default ProfileDetails;
