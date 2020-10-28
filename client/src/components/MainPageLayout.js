import React from 'react';
import PropTypes from 'prop-types';

import { SideMenu } from './';

const Layout = (props) => {
  return (
    <div className="d-flex flex-row" style={{ maxHeight: '100vh' }}>
      <SideMenu />
      <div className="flex-column flex-grow-1">
        <div
          className="p-5"
          style={{ width: '85vw', maxHeight: '85vh', overflowY: 'scroll' }}>
          {props.children}
        </div>
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
