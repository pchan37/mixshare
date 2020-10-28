import React from 'react';

import { Form, Button, Row, Col } from 'react-bootstrap';

const SignUpForm = () => {
  return (
    <Form>
      <Form.Group controlId="username" className="pt-3">
        <Form.Label>Username</Form.Label>
        <Form.Control type="username" placeholder="Username" />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" />
      </Form.Group>
      <Row>
        <Col style={{ textAlign: 'center' }}>
          <Button href="/discover" variant="primary" type="submit">
            Sign Up
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SignUpForm;
