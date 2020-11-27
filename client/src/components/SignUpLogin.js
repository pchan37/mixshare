import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Axios from 'axios';
import { Alert, Button, Col, Form, Row, Tabs, Tab } from 'react-bootstrap';

import { UserContext } from '../contexts';

const SignUpLogin = () => {
  const [tabKey, setTabKey] = useState('signup');
  const [registerStatus, setRegisterStatus] = useState(null);
  const [loginStatus, setLoginStatus] = useState(null);

  const { setCurrentUser } = useContext(UserContext);

  const history = useHistory();
  const { state } = useLocation();

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;

    try {
      const res = await Axios.post('/api/auth/register', {
        username: form.elements.username.value,
        password: form.elements.password.value,
        confirmationPassword: form.elements.confirmationPassword.value,
      });
      console.log(res.data);
      setLoginStatus(res.data);
      setTabKey('login');
    } catch (err) {
      console.log(err.response);
      setRegisterStatus(err.response.data);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;

    try {
      const res = await Axios.post('/api/auth/login', {
        username: form.elements.username.value,
        password: form.elements.password.value,
      });

      setCurrentUser(res.data);
      if (state !== null && state !== undefined) {
        history.push(state?.from || '/discover');
      } else {
        history.push('/discover');
      }
    } catch (err) {
      setLoginStatus(err.response.data);
    }
  };

  useEffect(() => {
    if (state?.from !== undefined && state?.from !== null) {
      setTabKey('login');
      setLoginStatus({
        status: 'warning',
        statusMessage: 'You need to be logged in to view this page!',
      });
    }
  }, [state?.from]);

  return (
    <Tabs
      transition={false}
      id="signuptab"
      className="w-75"
      activeKey={tabKey}
      onSelect={(k) => setTabKey(k)}>
      <Tab eventKey="signup" title="SignUp">
        {registerStatus && (
          <div className="mt-3">
            <Alert
              variant={
                registerStatus.statusType === 'success' ? 'success' : 'danger'
              }>
              {registerStatus.statusMessage}
            </Alert>
          </div>
        )}

        <Form className="px-5" onSubmit={handleRegister}>
          <Form.Group controlId="username" className="pt-5">
            <Form.Control
              type="username"
              name="username"
              placeholder="Username"
            />
          </Form.Group>
          <Form.Group controlId="password" className="pt-2">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="pt-2">
            <Form.Control
              type="password"
              name="confirmationPassword"
              placeholder="Confirm Password"
            />
          </Form.Group>
          <Row>
            <Col style={{ textAlign: 'center' }} className="pt-2">
              <Button variant="outline-primary" type="submit">
                Sign Up
              </Button>
            </Col>
          </Row>
        </Form>
      </Tab>
      <Tab eventKey="login" title="Login">
        {loginStatus && (
          <div className="mt-3">
            <Alert
              variant={
                loginStatus.statusType === 'success' ? 'success' : 'danger'
              }>
              {loginStatus.statusMessage}
            </Alert>
          </div>
        )}

        <Form className="px-5" onSubmit={handleLogin}>
          <Form.Group controlId="username" className="pt-5">
            <Form.Control
              type="username"
              name="username"
              placeholder="Username"
            />
          </Form.Group>
          <Form.Group controlId="password" className="pt-3">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
            />
          </Form.Group>
          <div style={{ height: '15px' }}></div>
          <Row>
            <Col style={{ textAlign: 'center' }}>
              <Button variant="outline-primary" type="submit">
                Login
              </Button>
            </Col>
          </Row>
        </Form>
      </Tab>
    </Tabs>
  );
};

export default SignUpLogin;
