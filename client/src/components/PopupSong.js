import React, { useContext } from 'react';

import styled from 'styled-components';

import { Image } from 'react-bootstrap';

import { CurrentlyPlayingContext } from '../contexts';

const HoverDiv = styled.div`
  :hover {
    background-color: #979696;
  }
`;

const PopupSong = (props) => {
  const { setCurrentlyPlaying } = useContext(CurrentlyPlayingContext);

  return (
    <HoverDiv
      style={{ cursor: 'pointer' }}
      className="d-flex flex-row align-items-center"
      onClick={() => {
        setCurrentlyPlaying((prevState) => ({
          ...prevState,
          song: props.song.songId,
        }));
      }}>
      <div className="mb-3" style={{ maxWidth: '3vw' }}>
        <Image fluid src={props.song.thumbnail} />
      </div>
      <div className="ml-2 align-self-top">
        <p style={{ fontSize: 10 }}>
          {props.song.title} <br />
          by {props.song.artist}
        </p>
      </div>
    </HoverDiv>
  );
};

export default PopupSong;
