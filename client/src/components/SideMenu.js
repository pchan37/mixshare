import React from 'react';

import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Nav, Navbar, OverlayTrigger, Popover } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AccountCircle } from '@material-ui/icons';
import styled from 'styled-components';

import Logo from '../assets/images/logo.png';

const LargerNavLink = styled(Nav.Link)`
  font-size: 25px;
`;

const SideMenu = () => {
  const history = useHistory();

  const logoutHandler = () => {
    Axios.post('/api/auth/logout').then(() => {
      history.push('/');
    });
  };

  const ProfileClickPopup = (
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
    <div
      style={{ height: '100vh', width: '15vw' }}
      className="d-flex flex-column border-right">
      <Navbar className="flex-column flex-grow-1" style={{ width: '15vw' }}>
        <Nav className="flex-column flex-grow-1">
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src={Logo}
                width="100%"
                className="d-inline-block align-top"
                alt="Mixshare"
              />
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
              overlay={ProfileClickPopup}
              trigger="click">
              <LargerNavLink>
                <AccountCircle
                  fluid
                  className="mr-3"
                  style={{ fontSize: 50 }}
                />
                Profile
              </LargerNavLink>
            </OverlayTrigger>
          </div>
        </Nav>
      </Navbar>
    </div>
  );
};

export default SideMenu;
