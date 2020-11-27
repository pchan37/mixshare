import React, { useContext } from 'react';
import { Image, Nav, Navbar, OverlayTrigger, Popover } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom';

import Axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Logo from '../assets/images/logo.png';

import { UserContext } from '../contexts';

const LargerNavLink = styled(Nav.Link)`
  font-size: 25px;
`;

const SideMenuContainer = styled.div`
  height: 100vh;
  width: ${(props) => props.width};
`;

const SideMenu = ({ width }) => {
  const { currentUser } = useContext(UserContext);
  const history = useHistory();

  const logoutHandler = () => {
    Axios.post('/api/auth/logout').then(() => {
      history.push('/');
    });
  };

  const ProfilePopup = (
    <Popover>
      <Popover.Content>
        <Navbar className="p-0">
          <Nav className="flex-column">
            <LinkContainer to="/profile">
              <Nav.Link>Profile</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/account" className="border-bottom">
              <Nav.Link>Manage Account</Nav.Link>
            </LinkContainer>

            <LinkContainer to="#" onClick={logoutHandler}>
              <Nav.Link>Logout</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar>
      </Popover.Content>
    </Popover>
  );

  return (
    <SideMenuContainer
      className="d-flex flex-column border-right"
      width={width}>
      <Navbar
        className="flex-column flex-grow-1 flex-shrink-1"
        style={{ width }}>
        <Nav className="flex-column flex-grow-1 flex-shrink-1">
          <LinkContainer to="/">
            <Navbar.Brand>
              <Image src={Logo} alt="Mixshare" fluid />
            </Navbar.Brand>
          </LinkContainer>

          <LinkContainer to="/discover" className="mt-5">
            <LargerNavLink>Discover</LargerNavLink>
          </LinkContainer>
          <LinkContainer to="/playlists">
            <LargerNavLink>Playlists</LargerNavLink>
          </LinkContainer>
          <LinkContainer to="/friends">
            <LargerNavLink>Friends</LargerNavLink>
          </LinkContainer>
          <LinkContainer to="/gifts">
            <LargerNavLink>Gifts</LargerNavLink>
          </LinkContainer>

          <div className="mt-auto">
            <OverlayTrigger
              placement="top-start"
              delay={{ show: 250, hide: 400 }}
              overlay={ProfilePopup}
              trigger="click">
              <LargerNavLink>
                <AccountCircleIcon className="mr-3" style={{ fontSize: 50 }} />
                {currentUser.username}
              </LargerNavLink>
            </OverlayTrigger>
          </div>
        </Nav>
      </Navbar>
    </SideMenuContainer>
  );
};

SideMenu.propTypes = {
  width: PropTypes.number.isRequired,
};

export default SideMenu;
