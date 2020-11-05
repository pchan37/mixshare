import React from 'react';
import PropTypes from 'prop-types';

import { FixedMusicPlayer, SideMenu } from './';

const pullDown = {
  bottom: 0,
  position: 'fixed',
};

const MainPageLayout = (props) => {
  return (
    <div className="d-flex flex-row" style={{ maxHeight: '100vh' }}>
      <SideMenu />
      <div className="flex-column flex-grow-1">
        <div
          className="p-5"
          style={{ width: '85vw', maxHeight: '85vh', overflowY: 'scroll' }}>
          {props.children}
        </div>
        <div className="border-top" style={pullDown}>
          <FixedMusicPlayer />
        </div>
      </div>
    </div>
  );
};

MainPageLayout.propTypes = {
  children: PropTypes.node,
};

export default MainPageLayout;
