import React from 'react';

import { Container, Figure, Row, Col } from 'react-bootstrap';
import { Layout, SignUpLogin } from '../components';
import Logo from '../assets/images/logo.png';

const Homepage = () => {
  return (
    <Layout>
      <div style={{ height: '100vh', padding: '30vh 0 0 0' }}>
        <Container>
          <Row>
            <Col class="my-auto">
              <Figure.Image width={550} height={550} src={Logo} />
            </Col>
            <Col xs={1}></Col>
            <Col>
              <SignUpLogin />
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default Homepage;
