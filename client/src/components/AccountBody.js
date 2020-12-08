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

import { AccountDetails, DeletePopup } from './';

import { UserContext } from '../contexts';

const AccountBody = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const getModalResponse = async (value) => {
    if (value) {
      try {
        const friends = await Axios.post('api/user/friends', {
          username: currentUser.username,
        });
        console.log(friends.data);
        for await (const x of friends.data) {
          await Axios.post('api/user/removeFriend', {
            currUsername: currentUser.username,
            unfriend: x.userId,
          });
        }
        await Axios.post('/api/account/deleteAccount', {
          username: currentUser.username,
        });
        setCurrentUser(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

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
      <Row style={{ paddingLeft: 30, paddingTop: 200 }}>
        <DeletePopup
          bodytext="Are you sure you want to delete your account? (Your playlists will not be automatically deleted.)"
          getResponse={getModalResponse}>
          <Button variant="danger">Delete Account</Button>
        </DeletePopup>
      </Row>
    </Container>
  );
};

export default AccountBody;
