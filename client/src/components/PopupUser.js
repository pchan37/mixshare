import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { ProfileContext } from '../contexts';

const PopupUser = (props) => {
  const { setCurrentProfile } = useContext(ProfileContext);

  return (
    <div>
      <Row className="d-flex flex-row" style={{ alignItems: 'center' }}>
        <Col className="d-flex flex-row">
          <AccountCircleIcon
            className="mr-2"
            style={{ color: '#979696', fontSize: 30 }}
          />
          <LinkContainer className="p-0 pt-1" to="/profile">
            <Nav.Link onSelect={() => setCurrentProfile(props.username)}>
              {props.username}
            </Nav.Link>
          </LinkContainer>
        </Col>
        <Col className="d-flex flex-row justify-content-end">
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
