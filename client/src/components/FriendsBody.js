import React from 'react';

import { FriendItem } from './';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { ErrorOutline, PersonAdd } from '@material-ui/icons';

import data from '../placeholders/data';

const FriendsBody = () => {
  return (
    <div className="d-flex flex-column mb-5">
      <Row style={{ alignItems: 'flex-end', justifyContent: 'space-evenly' }}>
        <Col>
          <h2 className="m-0 p-0">Friends</h2>
        </Col>
        <Col>
          <Button variant="flat pb-0" style={{ color: '#979696' }}>
            Pending Friend Requests
          </Button>
          <ErrorOutline className="mb-3" style={{ color: '#979696' }} />
        </Col>
        <Col>
          <div className="d-flex flex-row" style={{ alignItems: 'flex-end' }}>
            <Button variant="flat pb-0" style={{ color: '#979696' }}>
              <PersonAdd className="mr-2" style={{ color: '#979696' }} />
              Add Friend
            </Button>
          </div>
        </Col>
        <Col>
          <div className="d-flex flex-row" style={{ alignItems: 'center' }}>
            <span className="align-self-top mr-3">Sort by:</span>
            <Form.Control as="select" className="w-50">
              <option>Most Recent</option>
              <option>Most Interacted With</option>
            </Form.Control>
          </div>
        </Col>
      </Row>
      {data.friends.map((f) => {
        return <FriendItem key={f.id} username={f.username} />;
      })}
    </div>
  );
};

export default FriendsBody;
