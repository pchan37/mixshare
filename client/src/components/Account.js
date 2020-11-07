import React from 'react';

import { Container, Row, Col, Button, OverlayTrigger } from 'react-bootstrap';
import { AccountDetails, DeleteAccountPopup, ChangeProfilePicPopup } from './';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Account = () => {
  return (
    <Container class="px-0">
      <Row>
        <h2>Account Settings</h2>
      </Row>
      <Row style={{ paddingTop: 20 }}>
        <Col xs={3}>
          <AccountCircleIcon style={{ fontSize: 200 }} />
        </Col>
        <Col>
          <AccountDetails />
        </Col>
      </Row>
      <Row style={{ paddingLeft: 20, paddingTop: 15 }}>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={ChangeProfilePicPopup}
          trigger="click">
          <Button variant="light">Change Profile Picture</Button>
        </OverlayTrigger>
      </Row>
      <Row style={{ paddingLeft: 30, paddingTop: 200 }}>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={DeleteAccountPopup}
          trigger="click">
          <Button variant="danger">Delete My Account</Button>
        </OverlayTrigger>
      </Row>
    </Container>
  );
};

export default Account;
