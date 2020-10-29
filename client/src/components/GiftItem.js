import React from 'react';
import { Button, Image } from 'react-bootstrap';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import DeleteIcon from '@material-ui/icons/Delete';

const GiftItems = () => {
  return (
    <div className="d-flex flex-row border-bottom pb-2 mb-2">
      <div className="d-flex flex-row flex-grow-1">
        <div className="d-flex flex-column">
          <p>User 1 has sent you a gift: [playlist name] by [username]</p>
          <div className="ml-2" style={{ color: 'gray' }}>
            [Message Here]
          </div>
        </div>
      </div>
      <div className="d-flex flex-row">
        <Image
          fluid
          style={{ maxWidth: '10vw' }}
          src="https://wp-en.oberlo.com/wp-content/uploads/2019/04/image13-1-1024x576.png"
        />
        <Button variant="flat">
          <SaveAltIcon />
        </Button>
        <Button variant="flat">
          <DeleteIcon />
        </Button>
      </div>
    </div>
  );
};

export default GiftItems;
