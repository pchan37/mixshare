import React, { useContext, useState } from 'react';
import { Image } from 'react-bootstrap';
import YouTube from 'react-youtube';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineOutlinedIcon from '@material-ui/icons/PlayCircleOutlineOutlined';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import MenuIcon from '@material-ui/icons/Menu';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';

import { CurrentlyPlayingContext } from '../contexts';

const normalIconStyle = {
  color: '#979696',
  fontSize: 40,
  cursor: 'pointer',
};

const normalIconStyleActive = {
  color: '#6efae5',
  fontSize: 40,
  cursor: 'pointer',
};

const largeIconStyle = {
  ...normalIconStyle,
  fontSize: 60,
};

const FixedMusicPlayer = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const MusicPlayer = ({ expandedState, height, setExpandedState, width }) => {
  const { currentlyPlaying, setCurrentlyPlaying } = useContext(
    CurrentlyPlayingContext
  );
  const [player, setPlayer] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [loop, setLoop] = useState(currentlyPlaying.opts.playerVars.loop);

  // copy of state object maintained for ease of updating individual fields
  const playingContextCopy = { ...currentlyPlaying };

  const FullscreenButton = (
    <FullscreenIcon
      onClick={() => setExpandedState(!expandedState)}
      style={normalIconStyle}
    />
  );

  const FullscreenExitButton = (
    <FullscreenExitIcon
      onClick={() => setExpandedState(!expandedState)}
      style={normalIconStyle}
    />
  );

  const NormalVideo = (
    <div className="h-100">
      <YouTube
        videoId={currentlyPlaying.song}
        id="player"
        opts={currentlyPlaying.opts}
        onReady={(e) => {
          setPlayer(e.target);
          setPlaying(true);
        }}
        onEnd={() => {
          if (!loop) {
            playingContextCopy.song = '';
            playingContextCopy.opts.playerVars.loop = 0;
            setCurrentlyPlaying(playingContextCopy);
          } else {
            setCurrentlyPlaying(playingContextCopy);
          }
        }}
      />
    </div>
  );

  const ExpandedVideo = (
    <div className="d-flex align-items-center justify-content-center">
      <Image
        fluid
        src="https://wp-en.oberlo.com/wp-content/uploads/2019/04/image13-1-1024x576.png"
      />
    </div>
  );

  const PlayButton = (
    <PlayCircleOutlineOutlinedIcon
      style={largeIconStyle}
      onClick={() => {
        player.playVideo();
        setPlaying(true);
      }}
    />
  );

  const PauseButton = (
    <PauseCircleOutlineIcon
      style={largeIconStyle}
      onClick={() => {
        player.pauseVideo();
        setPlaying(false);
      }}
    />
  );

  const LoopButtonInactive = (
    <RepeatOneIcon
      style={normalIconStyle}
      onClick={() => {
        setLoop(1);
        playingContextCopy.opts.playerVars.loop = 1;
        playingContextCopy.opts.playerVars.playlist = currentlyPlaying.song;
      }}
    />
  );

  const LoopButtonActive = (
    <RepeatOneIcon
      style={normalIconStyleActive}
      onClick={() => {
        setLoop(0);
        playingContextCopy.opts.playerVars.loop = 0;
        playingContextCopy.opts.playerVars.playlist = '';
      }}
    />
  );

  return (
    <>
      {expandedState && ExpandedVideo}

      <FixedMusicPlayer height={height} width={width}>
        <div className="d-flex align-items-center h-100">
          {!expandedState && NormalVideo}

          <div className="d-flex align-items-center w-100" style={{ height }}>
            <div
              className="d-flex justify-content-center"
              style={{ gap: '2rem', flex: '5' }}>
              <SkipPreviousIcon style={largeIconStyle} />
              {playing ? PauseButton : PlayButton}
              <SkipNextIcon style={largeIconStyle} />
            </div>
            <div
              className="d-flex justify-content-center flex-grow-1 flex-shrink-1"
              style={{ gap: '1rem' }}>
              <ShuffleIcon style={normalIconStyle} />
              <RepeatIcon style={normalIconStyle} />
              {loop === 1 ? LoopButtonActive : LoopButtonInactive}
            </div>
            <div
              className="d-flex justify-content-center flex-grow-1 flex-shrink-1"
              style={{ gap: '1rem' }}>
              <VolumeUpIcon style={normalIconStyle} />
              <MenuIcon style={normalIconStyle} />
              {expandedState ? FullscreenExitButton : FullscreenButton}
            </div>
          </div>
        </div>
      </FixedMusicPlayer>
    </>
  );
};

MusicPlayer.propTypes = {
  expandedState: PropTypes.bool.isRequired,
  height: PropTypes.string.isRequired,
  setExpandedState: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
};

export default MusicPlayer;
