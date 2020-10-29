import React from 'react';

import { Form, Button, Row, Col } from 'react-bootstrap';

const SignUpForm = () => {
  return (
    <Form class="w-75 px-5">
      <Form.Group controlId="username" className="pt-4">
        <Form.Control type="username" placeholder="Username" />
      </Form.Group>
      <Form.Group controlId="password" className="pt-2">
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="pt-2">
        <Form.Control type="password" placeholder="Confirm Password" />
      </Form.Group>
      <Row>
        <Col style={{ textAlign: 'center' }} className="pt-2">
          <Button href="/discover" variant="primary" type="submit">
            Sign Up
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SignUpForm;
