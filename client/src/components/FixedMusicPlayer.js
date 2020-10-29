import React from 'react';

import { Row, Col } from 'react-bootstrap';
import {
  PlayCircleOutlineOutlined,
  SkipPrevious,
  SkipNext,
  Shuffle,
  Repeat,
  RepeatOne,
  VolumeUp,
  Menu,
  Fullscreen,
} from '@material-ui/icons';

const fixedMusicPlayerStyles = {
  width: '85vw',
  height: '15vh'
};

const verticalAndHorizontalAlignStyles = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center'
}

const FixedMusicPlayer = () => {
  return (
    <div style={fixedMusicPlayerStyles}>
      <Row style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Col xs="2" style={{ backgroundColor: ''}}></Col>
        <Col xs="4" style={verticalAndHorizontalAlignStyles}>
          <SkipPrevious style={{ color: '#979696', fontSize: 60 }} />
          <PlayCircleOutlineOutlined
            style={{ color: '#979696', fontSize: 50 }}
          />
          <SkipNext style={{ color: '#979696', fontSize: 60 }} />
        </Col>
        <Col style={verticalAndHorizontalAlignStyles}>
          <Shuffle style={{ color: '#979696', fontSize: 40 }} />
          <Repeat style={{ color: '#979696', fontSize: 40 }} />
          <RepeatOne style={{ color: '#979696', fontSize: 40 }} />
        </Col>
        <Col style={verticalAndHorizontalAlignStyles}>
          <VolumeUp style={{ color: '#979696', fontSize: 40 }} />
          <Menu style={{ color: '#979696', fontSize: 40 }} />
          <Fullscreen style={{ color: '#979696', fontSize: 40}} />
        </Col> 
      </Row>
    </div>
  );
};

export default FixedMusicPlayer;
