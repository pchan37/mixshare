import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { Delete } from '@material-ui/icons';

const GiftItem = (props) => {
  return (
    <>
      <div className="d-flex flex-row border-bottom pb-2 mb-2">
        <div className="d-flex flex-row flex-grow-1">
          <div className="d-flex flex-column">
            <p>
              {props.gifter} has sent you a gift: {props.name} by {props.artist}
            </p>
            <div className="ml-2" style={{ color: 'gray' }}>
              {props.message}
            </div>
          </div>
        </div>
        <div className="d-flex flex-row">
          <Image
            fluid
            style={{ maxWidth: '10vw' }}
            src="https://wp-en.oberlo.com/wp-content/uploads/2019/04/image13-1-1024x576.png"
          />
          {props.children}
          <Button variant="flat">
            <Delete style={{ color: '#979696' }} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default GiftItem;
