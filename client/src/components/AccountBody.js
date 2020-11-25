import React, { useContext } from 'react';
import Axios from 'axios';
import {
  Button,
  Col,
  Container,
  Form,
  OverlayTrigger,
  Popover,
  Row,
} from 'react-bootstrap';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { AccountDetails, DeleteAccountPopup } from './';

const ChangeProfilePicPopup = (
  <Popover id="popover-basic">
    <Popover.Content>
      <Form>
        <Form.Group class="p-1">
          <Form.File id="profile-pic" label="Select a Profile Picture" />
        </Form.Group>
      </Form>
    </Popover.Content>
  </Popover>
);

const getModalResponse = async (del, user) => {
  if (del) {
    try {
      console.log('Deleting Account');
      const deletingAccount = await Axios.post('/api/account/deleteAccount', {
        username: user,
      });
    } catch (err) {
      console.log(err.response);
      setChangeUsernameStatus(err.response.data);
    }
  }
};

const AccountBody = () => {
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
        <DeleteAccountPopup parentCallback={getModalResponse} />
      </Row>
    </Container>
  );
};

export default AccountBody;
