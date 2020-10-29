import React from 'react';

import { HorizontalThumbnail } from './';

import { Button } from 'react-bootstrap';
import { CardGiftcard, Delete } from '@material-ui/icons';

const PlaylistEditItem = () => {
  return (
    <div className="d-flex flex-row mt-3">
      <div className="d-flex flex-row flex-grow-1 ml-4">
        <HorizontalThumbnail />
      </div>

      <Button variant="flat">
        <CardGiftcard />
      </Button>

      <Button variant="flat">
        <Delete />
      </Button>
    </div>
  );
};

export default PlaylistEditItem;
