import React from 'react';
import PropTypes from 'prop-types';

import { Row, Button, Col } from 'react-bootstrap';
import { AccountCircle } from '@material-ui/icons';

const User = (props) => {
  return (
    <div>
      <Row>
        <Col xs="5">
          <AccountCircle
            className="mr-3"
            style={{ color: '#979696', fontSize: 50 }}
          />
          {props.username}
        </Col>
        <Col
          xs="3"
          className="d-flex align-items-center justify-content-around">
          <Button variant="flat" style={{ color: '#979696', height: '40px' }}>
            View Profile
          </Button>
          {props.children}
        </Col>
      </Row>
    </div>
  );
};

User.propTypes = {
  children: PropTypes.node,
  username: PropTypes.string.isRequired,
};

export default User;
