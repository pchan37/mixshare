import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Container, Row, Col, Button, OverlayTrigger } from 'react-bootstrap';
import EditIcon from '@material-ui/icons/Edit';
import { ChangeUsernamePopup, ChangePasswordPopup } from './';

function AccountDetails() {
  const [username, updateUsername] = useState('');

  // Gets username from database and updates username state
  const getUsername = async () => {
    try {
      const usernameRes = await Axios.get('/api/auth/user');
      updateUsername(usernameRes.data.username);
    } catch {
      console.log('Error retrieving username');
    }
  };

  // called on load
  useEffect(() => {
    getUsername();
  });

  return (
    <Container style={{ paddingTop: 70 }}>
      <Row>
        <Col>
          <label>Username: {username}</label>
        </Col>
        <Col>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={ChangeUsernamePopup}
            trigger="click">
            <Button variant="light">
              <EditIcon />
            </Button>
          </OverlayTrigger>
        </Col>
      </Row>
      <Row style={{ paddingTop: 10 }}>
        <Col>
          <label>Password: ***************</label>
        </Col>
        <Col>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={ChangePasswordPopup}
            trigger="click">
            <Button variant="light">
              <EditIcon />
            </Button>
          </OverlayTrigger>
        </Col>
      </Row>
    </Container>
  );
}

export default AccountDetails;
