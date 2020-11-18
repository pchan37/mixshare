import React, { useState } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MusicPlayer, SideMenu } from '../components';

const MusicPlayerHeight = '15vh';
const MusicPlayerWidth = '85vw';
const PageBodyHeight = '85vh';
const PageBodyWidth = MusicPlayerWidth;
const SideMenuWidth = '15vw';

const musicPlayerStyle = {
  bottom: 0,
  position: 'fixed',
};

const PageBodyContainer = styled.div`
  width: ${PageBodyWidth};
  height: ${PageBodyHeight};
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
    <div className="d-flex flex-row vh-100">
      <SideMenu width={{ SideMenuWidth }} />
      <div className="flex-column flex-grow-1">
        {!expandedMusicPlayerState && PageBody}
        <div
          className={expandedMusicPlayerState ? '' : 'border-top'}
          style={musicPlayerStyle}>
          <MusicPlayer
            expandedState={expandedMusicPlayerState}
            height={MusicPlayerHeight}
            setExpandedState={setExpandedMusicPlayerState}
            width={MusicPlayerWidth}
          />
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
