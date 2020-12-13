import React, { useContext } from 'react';
import { Image, Nav, Navbar, OverlayTrigger, Popover } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom';

import Axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Logo from '../assets/images/logo-new.png';

import {
  CurrentlyPlayingContext,
  ProfileContext,
  UserContext,
} from '../contexts';

const LargerNavLink = styled(Nav.Link)`
  font-size: 25px;
  color: white;
`;

const SideMenuContainer = styled.div`
  height: 100vh;
  width: ${(props) => props.width};
`;

const SideMenu = ({ width }) => {
  const { setCurrentlyPlaying } = useContext(CurrentlyPlayingContext);
  const { currentUser } = useContext(UserContext);
  const { setCurrentProfile } = useContext(ProfileContext);
  const history = useHistory();

  const clearPlaying = () => {
    setCurrentlyPlaying({
      song: '',
      playlist: '',
      repeat: false,
      shuffle: false,
      opts: {
        playerVars: {
          controls: 1,
          autoplay: 1,
          loop: 0,
          playlist: '',
        },
      },
    });
  };

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
              <Nav.Link
                onSelect={() => {
                  setCurrentProfile(currentUser.username);
                  clearPlaying();
                }}>
                Profile
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/account" className="border-bottom">
              <Nav.Link onSelect={() => clearPlaying()}>
                Manage Account
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="#" onClick={logoutHandler}>
              <Nav.Link onSelect={() => clearPlaying()}>Logout</Nav.Link>
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
            <LargerNavLink onSelect={() => clearPlaying()}>
              Discover
            </LargerNavLink>
          </LinkContainer>
          <LinkContainer to="/playlists">
            <LargerNavLink onSelect={() => clearPlaying()}>
              Playlists
            </LargerNavLink>
          </LinkContainer>
          <LinkContainer to="/friends">
            <LargerNavLink onSelect={() => clearPlaying()}>
              Friends
            </LargerNavLink>
          </LinkContainer>
          <LinkContainer to="/gifts">
            <LargerNavLink onSelect={() => clearPlaying()}>Gifts</LargerNavLink>
          </LinkContainer>

          <div className="mt-auto">
            <OverlayTrigger
              placement="top-start"
              delay={{ show: 250, hide: 400 }}
              overlay={ProfilePopup}
              trigger="click"
              rootClose>
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
