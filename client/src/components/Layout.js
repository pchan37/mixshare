import React from 'react';
import PropTypes from 'prop-types';

const Layout = (props) => {
  return <div style={{ height: '100vh' }}>{props.children}</div>;
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
