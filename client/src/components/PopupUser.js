import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-bootstrap';
import { AccountCircle } from '@material-ui/icons';

const PopupUser = (props) => {
  return (
    <div>
      <Row className="d-flex flex-row" style={{ alignItems: 'center' }}>
        <Col className="d-flex flex-row">
          <AccountCircle
            className="mr-2"
            style={{ color: '#979696', fontSize: 30 }}
          />
          {props.username}
        </Col>
        <Col className="d-flex flex-row justify-content-center">
          {props.children}
        </Col>
      </Row>
    </div>
  );
};

PopupUser.propTypes = {
  children: PropTypes.node,
  username: PropTypes.string.isRequired,
};

export default PopupUser;
