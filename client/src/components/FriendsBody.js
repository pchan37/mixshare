import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';

import { FriendItem, PopupUser } from './';
import {
  Button,
  Form,
  Row,
  Col,
  Popover,
  OverlayTrigger,
} from 'react-bootstrap';
import { ErrorOutline, PersonAdd } from '@material-ui/icons';

import { UserContext } from '../contexts';

const popupBodyStyle = {
  margin: '2vh 0',
  maxHeight: '30vh',
  overflowY: 'scroll',
  overflowX: 'hidden',
};

const iconStyle = {
  color: '#979696',
  fontSize: 20,
  cursor: 'pointer',
};

const FriendsBody = () => {
  const { currentUser } = useContext(UserContext);
  const [searchResults, setSearchResults] = useState([]);
  const [response, setResponse] = useState('');
  const [pendingFriendRequests, setPending] = useState([]);
  const [friends, setFriends] = useState([]);

  const searchUsers = async (event) => {
    event.preventDefault();
    setResponse('');
    const enteredQuery = event.target.elements.query.value;
    const gettingResults = await Axios.post('/api/user/searchUsers', {
      query: enteredQuery,
      username: currentUser.username,
    });
    setSearchResults(gettingResults.data);
  };

  // get pending friend requests; called on load
  async function getPendingRequests() {
    const pendingRequests = await Axios.post('/api/user/getPendingRequests', {
      username: currentUser.username,
    });
    setPending(pendingRequests.data);
  }

  async function getFriends() {
    const friends = await Axios.post('api/user/friends', {
      username: currentUser.username,
    });
    setFriends(friends.data);
  }

  useEffect(() => {
    getFriends();
    getPendingRequests();
  }, []);

  const sendFriendRequest = async (userId) => {
    try {
      const sendRequest = await Axios.post('/api/user/sendFriendRequest', {
        userId: userId,
        selfUsername: currentUser.username,
      });
      setResponse(sendRequest.data.statusMessage);
    } catch (err) {
      console.error(err);
      setResponse(err.response.data.statusMessage);
    }
  };

  const acceptRequest = async (userId) => {
    console.log(`accepting friend request from ${userId}`);

    try {
      await Axios.post('/api/user/removeRequest', {
        currUser: currentUser.username,
        userToAccept: userId,
      });
      getPendingRequests();

      await Axios.post('/api/user/addUser', {
        currUser: currentUser.username,
        userToAccept: userId,
      });
      getFriends();
    } catch (err) {
      console.error(err);
    }
  };

  const rejectRequest = async (userId) => {
    console.log(`rejecting request from ${userId}`);
    try {
      await Axios.post('/api/user/removeRequest', {
        currUser: currentUser.username,
        userToAccept: userId,
      });
      getPendingRequests();
    } catch (err) {
      console.error(err);
    }
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
          {response !== '' ? <Form.Text>{response}</Form.Text> : null}
        </Form>
        <div style={popupBodyStyle}>
          {searchResults.map((f) => {
            return (
              <PopupUser key={f.userId} username={f.username}>
                <PersonAdd
                  style={iconStyle}
                  onClick={() => {
                    getPendingRequests();
                    sendFriendRequest(f.userId);
                  }}
                />
              </PopupUser>
            );
          })}
        </div>
      </Popover.Content>
    </Popover>
  );

  const PendingFriendsPopup = (
    <Popover style={{ minWidth: '25%' }}>
      <Popover.Content>
        <div className="text-center">
          {pendingFriendRequests.length > 0
            ? 'Incoming Friend Requests'
            : 'No Friend Requests to Display'}
        </div>
        <div style={popupBodyStyle}>
          {pendingFriendRequests.map((p) => {
            return (
              <PopupUser key={p.userId} username={p.username}>
                <Button
                  variant="flat"
                  className="btn btn-link"
                  onClick={() => acceptRequest(p.userId)}>
                  Accept
                </Button>
                <Button
                  variant="flat"
                  className="btn btn-link text-danger"
                  onClick={() => rejectRequest(p.userId)}>
                  Delete
                </Button>
              </PopupUser>
            );
          })}
        </div>
      </Popover.Content>
    </Popover>
  );

  return (
    <div className="d-flex flex-column mb-5">
      <Row
        className="mb-4"
        style={{ alignItems: 'flex-end', justifyContent: 'space-evenly' }}>
        <Col>
          <h2 className="m-0 p-0">Friends</h2>
        </Col>
        <Col>
          <OverlayTrigger
            placement="bottom"
            overlay={PendingFriendsPopup}
            rootClose
            trigger="click">
            <Button variant="flat pb-0" style={{ color: '#979696' }}>
              Pending Friend Requests
            </Button>
          </OverlayTrigger>
          {pendingFriendRequests.length != 0 && (
            <ErrorOutline className="mb-3" style={{ color: '#979696' }} />
          )}
        </Col>
        <Col>
          <div className="d-flex flex-row" style={{ alignItems: 'flex-end' }}>
            <OverlayTrigger
              placement="bottom"
              overlay={SearchUsersPopup}
              rootClose
              onToggle={() => {
                setSearchResults([]);
                setResponse('');
              }}
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
      {friends.map((f) => {
        return (
          <FriendItem
            key={f.userId}
            username={f.username}
            updateFriends={getFriends}
          />
        );
      })}
    </div>
  );
};

export default FriendsBody;
