import React, { useContext } from 'react';

import { Container, Row, Col, Button, OverlayTrigger } from 'react-bootstrap';

import { UserContext } from '../contexts';

import EditIcon from '@material-ui/icons/Edit';
import { ChangeUsernamePopup, ChangePasswordPopup } from './';

function AccountDetails() {
  const { currentUser } = useContext(UserContext);

  return (
    <Container style={{ paddingTop: 70 }}>
      <Row>
        <Col>
          <label>Username: {currentUser.username}</label>
        </Col>
        <Col>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={ChangeUsernamePopup}
            trigger="click">
            <Button variant="light">
              <EditIcon style={{ color: '#979696' }} />
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
              <EditIcon style={{ color: '#979696' }} />
            </Button>
          </OverlayTrigger>
        </Col>
      </Row>
    </Container>
  );
}

export default AccountDetails;
