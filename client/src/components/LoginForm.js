import React from 'react';

import { Form, Button, Row, Col } from 'react-bootstrap';

const LoginForm = () => {
  return (
    <Form className="w-75 px-5">
      <Form.Group controlId="username" className="pt-5">
        <Form.Control type="username" placeholder="Username" />
      </Form.Group>
      <Form.Group controlId="password" className="pt-3">
        <Form.Control type="password" placeholder="Password" />
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
  );
};

export default LoginForm;
