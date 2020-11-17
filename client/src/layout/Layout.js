import React, { useState } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MusicPlayer, SideMenu } from '../components';

const musicPlayerStyle = {
  bottom: 0,
  position: 'fixed',
  width: '85vw',
};

const PageBodyContainer = styled.div`
  width: 85vw;
  max-height: 85vh;
  overflow-y: auto;
`;

const Layout = (props) => {
  const [expandedMusicPlayerState, setExpandedMusicPlayerState] = useState(
    false
  );

  const PageBody = (
    <PageBodyContainer className="p-5">{props.children}</PageBodyContainer>
  );

  return (
    <div className="d-flex flex-row" style={{ maxHeight: '100vh' }}>
      <SideMenu />
      <div className="flex-column flex-grow-1">
        {!expandedMusicPlayerState && PageBody}
        <div
          className={expandedMusicPlayerState ? '' : 'border-top'}
          style={musicPlayerStyle}>
          <MusicPlayer
            expandedState={expandedMusicPlayerState}
            setExpandedState={setExpandedMusicPlayerState}
          />
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
