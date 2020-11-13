import React, { useContext, useState } from 'react';
import Axios from 'axios';
import {
  Alert,
  Button,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';

import { UserContext } from '../contexts';

import EditIcon from '@material-ui/icons/Edit';

function AccountDetails() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [changeUsernameStatus, setChangeUsernameStatus] = useState(null);
  const [changePasswordStatus, setChangePasswordStatus] = useState(null);

  const usernameClick = async (event) => {
    event.preventDefault();
    var newName = event.target.elements.newName.value;

    try {
      const changeName = await Axios.post('/api/account/changeUsername', {
        username: currentUser.username,
        newname: newName,
      });
      setChangeUsernameStatus(changeName);
      setCurrentUser(changeName.data);
    } catch (err) {
      console.log(err.response);
      setChangeUsernameStatus(err.response.data);
    }
  };

  const ChangeUsernamePopup = (
    <Popover id="popover-basic">
      <Popover.Content style={{ textAlign: 'center' }}>
        <Form onSubmit={(e) => usernameClick(e)}>
          <Form.Group>
            <Form.Control
              type="username"
              name="newName"
              placeholder="Enter New Username"
            />
            {changeUsernameStatus && (
              <Alert
                variant={
                  changeUsernameStatus.statusType === 'success'
                    ? 'success'
                    : 'danger'
                }>
                {changeUsernameStatus.statusMessage}
              </Alert>
            )}
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </Popover.Content>
    </Popover>
  );

  const passwordChangeClick = async (event) => {
    event.preventDefault();
    var password = event.target.elements.password.value;
    var confirmPassword = event.target.elements.confirm.value;

    try {
      const changePassword = await Axios.post('/api/account/changePassword', {
        username: currentUser.username,
        password: password,
        confirmPassword: confirmPassword,
      });
      setChangePasswordStatus(changePassword);
      setCurrentUser(changePassword); // TODO: This is a bad way to force logout
    } catch (err) {
      console.log(err.response);
      setChangePasswordStatus(err.response.data);
    }
  };

  const ChangePasswordPopup = (
    <Popover id="popover-basic">
      <Popover.Content style={{ textAlign: 'center' }}>
        <Form onSubmit={(e) => passwordChangeClick(e)}>
          <Form.Group>
            <Form.Control
              type="password"
              name="password"
              placeholder="New Password"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              name="confirm"
              placeholder="Confirm New Password"
            />
            {changePasswordStatus && (
              <Alert
                variant={
                  changePasswordStatus.statusType === 'success'
                    ? 'success'
                    : 'danger'
                }>
                {changePasswordStatus.statusMessage}
              </Alert>
            )}
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </Popover.Content>
    </Popover>
  );

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
            trigger="click"
            rootClose={true}>
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
