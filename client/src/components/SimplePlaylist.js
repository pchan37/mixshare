import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Image } from 'react-bootstrap';

const SimplePlaylist = (props) => {
  return (
    <div>
      <Row className="d-flex flex-row" style={{ alignItems: 'center' }}>
        <Col xs="9">
          <Image
            fluid
            style={{ maxWidth: '3vw', marginRight: '5px' }}
            src="https://wp-en.oberlo.com/wp-content/uploads/2019/04/image13-1-1024x576.png"
          />
          {props.name}
        </Col>
        <Col xs="3">{props.children}</Col>
      </Row>
    </div>
  );
};

SimplePlaylist.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
};

export default SimplePlaylist;
