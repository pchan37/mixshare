import React from 'react';

import PropTypes from 'prop-types';

const BasicLayout = (props) => {
  return <div style={{ height: '100vh' }}>{props.children}</div>;
};

BasicLayout.propTypes = {
  children: PropTypes.node,
};

export default BasicLayout;
