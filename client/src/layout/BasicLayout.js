import React from 'react';

import PropTypes from 'prop-types';

const BasicLayout = (props) => {
  return <div className="vh-100">{props.children}</div>;
};

BasicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
