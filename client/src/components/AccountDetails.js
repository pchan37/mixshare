import React from 'react';

import { Container, Row, Col, Button, OverlayTrigger } from 'react-bootstrap';
import EditIcon from '@material-ui/icons/Edit';
import { ChangeUsernamePopup, ChangePasswordPopup } from './';

const AccountDetails = () => {
  return (
    <Container style={{ paddingTop: 70 }}>
      <Row>
        <Col>
          <label>Username: JohnSmith</label>
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
};

export default AccountDetails;
