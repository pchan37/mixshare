import React from 'react';

import PropTypes from 'prop-types';

import Background from '../assets/images/login-background.png';
const backgroundStyle = {
  backgroundImage: `url(${Background})`,
  backgroundSize: 'cover',
  backgroundPosition: 'left center',
};

const BasicLayout = (props) => {
  return (
    <div style={backgroundStyle} className="vh-100">
      {props.children}
    </div>
  );
};

BasicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
