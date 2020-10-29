import React from 'react';

import { Figure, Nav } from 'react-bootstrap';
import Logo from '../assets/images/logo.png';
import { AvatarNameMenu } from './';

const SideMenu = () => {
  return (
    <div
      style={{ height: '100vh', width: '15vw' }}
      className="d-flex flex-column border-right justify-content-center">
      <Nav
        defaultActiveKey="/discover"
        className="flex-column flex-grow-1"
        style={{ width: '15vw' }}>
        <Nav.Link>
          <Figure>
            <Figure.Image width="100%" src={Logo} />
          </Figure>
        </Nav.Link>

        <Nav.Link href="/discover">Discover</Nav.Link>
        <Nav.Link>Playlists</Nav.Link>
        <Nav.Link>Friends</Nav.Link>
        <Nav.Link>Gifts</Nav.Link>
      </Nav>
      <div className="mb-3 ml-3">
        <AvatarNameMenu />
      </div>
    </div>
  );
};

export default SideMenu;
