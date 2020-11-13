import React from 'react';

import { Image } from 'react-bootstrap';

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

const fixedMusicPlayerStyles = {
  width: '85vw',
  height: '15vh',
};

const MusicPlayer = ({ expandedState, setExpandedState }) => {
  return (
    <>
      {expandedState && (
        <div className="d-flex align-items-center justify-content-center">
          <Image
            fluid
            src="https://wp-en.oberlo.com/wp-content/uploads/2019/04/image13-1-1024x576.png"
          />
        </div>
      )}
      <div style={fixedMusicPlayerStyles}>
        <div className="d-flex align-items-center h-100">
          {!expandedState && (
            <Image
              fluid
              style={{ maxWidth: '16%' }}
              src="https://wp-en.oberlo.com/wp-content/uploads/2019/04/image13-1-1024x576.png"
            />
          )}

          <div className="d-flex align-items-center w-100">
            <div
              className="d-flex justify-content-center"
              style={{ backgroundColor: 'white', gap: '2rem', flex: '5' }}>
              <SkipPreviousIcon style={{ color: '#979696', fontSize: 60 }} />
              <PlayCircleOutlineOutlinedIcon
                style={{ color: '#979696', fontSize: 60 }}
              />
              <SkipNextIcon style={{ color: '#979696', fontSize: 60 }} />
            </div>
            <div
              className="d-flex justify-content-center flex-grow-1 flex-shrink-1"
              style={{ backgroundColor: 'white', gap: '1rem' }}>
              <ShuffleIcon style={{ color: '#979696', fontSize: 40 }} />
              <RepeatIcon style={{ color: '#979696', fontSize: 40 }} />
              <RepeatOneIcon style={{ color: '#979696', fontSize: 40 }} />
            </div>
            <div
              className="d-flex justify-content-center flex-grow-1 flex-shrink-1"
              style={{ backgroundColor: 'white', gap: '1rem' }}>
              <VolumeUpIcon style={{ color: '#979696', fontSize: 40 }} />
              <MenuIcon style={{ color: '#979696', fontSize: 40 }} />
              {!expandedState && (
                <FullscreenIcon
                  onClick={() => setExpandedState(!expandedState)}
                  style={{ color: '#979696', fontSize: 40, cursor: 'pointer' }}
                />
              )}
              {expandedState && (
                <FullscreenExitIcon
                  onClick={() => setExpandedState(!expandedState)}
                  style={{ color: '#979696', fontSize: 40, cursor: 'pointer' }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
