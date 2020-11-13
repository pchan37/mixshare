import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { MusicPlayer, SideMenu } from './';

const pullDown = {
  bottom: 0,
  position: 'fixed',
};

const MainPageLayout = (props) => {
  const [expandedState, setExpandedState] = useState(false);

  return (
    <div className="d-flex flex-row" style={{ maxHeight: '100vh' }}>
      <SideMenu />
      <div className="flex-column flex-grow-1">
        {!expandedState && (
          <div
            className="p-5"
            style={{ width: '85vw', maxHeight: '85vh', overflowY: 'scroll' }}>
            {props.children}
          </div>
        )}
        <div className={expandedState ? '' : 'border-top'} style={pullDown}>
          <MusicPlayer
            expandedState={expandedState}
            setExpandedState={setExpandedState}
          />
        </div>
      </div>
    </div>
  );
};

MainPageLayout.propTypes = {
  children: PropTypes.node,
};

export default MainPageLayout;
