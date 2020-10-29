import React from 'react';

import { Tabs, Tab } from 'react-bootstrap';
import { SignUpForm, LoginForm } from './';

const SignUpLogin = () => {
  return (
    <Tabs
      defaultActiveKey="signup"
      transition={false}
      id="signuptab"
      className="w-75">
      <Tab eventKey="signup" title="SignUp">
        <SignUpForm />
      </Tab>
      <Tab eventKey="login" title="Login">
        <LoginForm />
      </Tab>
    </Tabs>
  );
};

export default SignUpLogin;
