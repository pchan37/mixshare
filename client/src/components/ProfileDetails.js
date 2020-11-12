import React from 'react';

import { Container } from 'react-bootstrap';
import { AccountCircle } from '@material-ui/icons';

const ProfileDetails = (props) => {
  return (
    <Container>
      <div className="d-flex flex-row" style={{ alignItems: 'center' }}>
        <AccountCircle style={{ color: '#979696', fontSize: 200 }} />
        <h2>{props.username}</h2>
      </div>
    </Container>
  );
};

export default ProfileDetails;
