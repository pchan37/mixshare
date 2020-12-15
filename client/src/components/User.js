import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { ProfileContext } from '../contexts';

const User = (props) => {
  const { setCurrentProfile } = useContext(ProfileContext);

  return (
    <div className=" m-2">
      <Row className="p-1 bg-dark">
        <Col xs="5">
          <AccountCircleIcon
            className="mr-3"
            style={{ color: '#979696', fontSize: 50 }}
          />
          <span className="text-light">{props.username}</span>
        </Col>
        <Col
          xs="3"
          className="d-flex align-items-center justify-content-around">
          <LinkContainer className="p-0 pt-1" to="/profile">
            <Nav.Link onSelect={() => setCurrentProfile(props.username)}>
              View Profile
            </Nav.Link>
          </LinkContainer>
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
