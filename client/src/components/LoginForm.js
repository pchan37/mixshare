import React from 'react';

import { Form, Button, Row, Col } from 'react-bootstrap';

const LoginForm = () => {
  return (
    <Form>
      <Form.Group controlId="username" className="pt-5">
        <Form.Label>Username</Form.Label>
        <Form.Control type="username" placeholder="Username" />
      </Form.Group>
      <Form.Group controlId="password" className="pt-4">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <div style={{ height: '30px' }}></div>
      <Row>
        <Col style={{ textAlign: 'center' }}>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default LoginForm;
