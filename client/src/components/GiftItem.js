import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { Delete } from '@material-ui/icons';
import { DeletePopup } from './';

const GiftItem = (props) => {
  async function getResponse(value) {
    if (value) {
      props.removeGift();
    }
  }

  return (
    <>
      <div className="d-flex flex-row border-bottom pb-2 mb-2">
        <div className="d-flex flex-row flex-grow-1">
          <div className="d-flex flex-column">
            <p>
              <b>{props.gifter}</b> has sent you a gift: <b>{props.name}</b> by{' '}
              <b>{props.artist}</b>
            </p>
            <div className="ml-2" style={{ color: 'gray' }}>
              {props.gifter} says: {props.message}
            </div>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center">
          <Image fluid style={{ maxWidth: '10vw' }} src={props.thumbnail} />
          {props.children}
          <DeletePopup
            bodytext="Are you sure you want to delete this gift?"
            getResponse={getResponse}>
            <Button variant="flat">
              <Delete style={{ color: '#979696' }} />
            </Button>
          </DeletePopup>
        </div>
      </div>
    </>
  );
};

export default GiftItem;
