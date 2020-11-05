import React from 'react';

import { ExpandedPlayerLayout } from '../components';
import { Image } from 'react-bootstrap';

const ExpandedMusicPlayer = () => {
  return (
    <ExpandedPlayerLayout>
      <Image
        fluid
        src="https://wp-en.oberlo.com/wp-content/uploads/2019/04/image13-1-1024x576.png"
      />
    </ExpandedPlayerLayout>
  );
};

export default ExpandedMusicPlayer;
