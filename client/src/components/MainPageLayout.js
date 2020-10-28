import React from 'react';
import PropTypes from 'prop-types';

import { SideMenu } from './';

const Layout = (props) => {
  return (
    <div className="d-flex flex-row" style={{ height: '100vh' }}>
      <SideMenu />
      <div className="flex-column flex-grow-1">
        <div style={{ width: '80vw' }}>{props.children}</div>
        <div className="mt-auto">
          <p>Fixed Music Player</p>
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
