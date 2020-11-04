import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-bootstrap';
import { AccountCircle } from '@material-ui/icons';

const SimpleUser = (props) => {
  return (
    <div>
      <Row className="d-flex flex-row" style={{ alignItems: 'center' }}>
        <Col xs="9">
          <AccountCircle
            className="mr-2"
            style={{ color: '#979696', fontSize: 20 }}
          />
          {props.username}
        </Col>
        <Col xs="3">{props.children}</Col>
      </Row>
    </div>
  );
};

SimpleUser.propTypes = {
  children: PropTypes.node,
  username: PropTypes.string.isRequired,
};

export default SimpleUser;
