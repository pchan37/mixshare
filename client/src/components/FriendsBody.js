import React, { useState } from 'react';
import Axios from 'axios';

import { FriendItem, User } from './';
import {
  Button,
  Form,
  Row,
  Col,
  Popover,
  OverlayTrigger,
} from 'react-bootstrap';
import { ErrorOutline, PersonAdd } from '@material-ui/icons';

import data from '../placeholders/data';

const FriendsBody = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchUsers = async (event) => {
    event.preventDefault();
    const query = event.target.elements.query.value;
    console.log('search Users');
    const gettingResults = await Axios.post('/api/user/searchUsers', {
      query: query,
    });
    setSearchResults(gettingResults.data);
    //console.log(gettingResults.data);
  };

  const SearchUsersPopup = (
    <Popover>
      <Popover.Content>
        <Form onSubmit={searchUsers}>
          <div className="d-flex flex-row">
            <Form.Control
              name="query"
              className="w-75"
              type="text"
              placeholder="Search Users"
            />
            <Button className="ml-2" variant="flat" type="submit">
              Go
            </Button>
          </div>
          {searchResults.map((f) => {
            return <User key={f.id} username={f.username} />;
          })}
        </Form>
      </Popover.Content>
    </Popover>
  );

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
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={SearchUsersPopup}
              hidden={() => setSearchResults([])} // still broken
              trigger="click">
              <Button variant="flat pb-0" style={{ color: '#979696' }}>
                <PersonAdd className="mr-2" style={{ color: '#979696' }} />
                Add Friend
              </Button>
            </OverlayTrigger>
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
