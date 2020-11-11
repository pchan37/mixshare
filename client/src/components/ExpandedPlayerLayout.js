import React from 'react';
import PropTypes from 'prop-types';

import { FixedMusicPlayer, SideMenu } from '.';

const pullDown = {
  bottom: 0,
  position: 'fixed',
};

const ExpandedPlayerLayout = (props) => {
  return (
    <div className="d-flex flex-row" style={{ maxHeight: '100vh' }}>
      <SideMenu />
      <div className="flex-column flex-grow-1">
        <div>{props.children}</div>
        <div className="border-top" style={pullDown}>
          <FixedMusicPlayer />
        </div>
      </div>
    </div>
  );
};

ExpandedPlayerLayout.propTypes = {
  children: PropTypes.node,
};

export default ExpandedPlayerLayout;
