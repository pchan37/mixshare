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

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

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

  // get search results given query
  const searchUsers = async (event) => {
    event.preventDefault();
    setResponse('');
    try {
      const enteredQuery = event.target.elements.query.value;
      const searchResults = await Axios.post('/api/user/searchUsers', {
        query: enteredQuery,
        username: currentUser.username,
      });
      if (enteredQuery === '') {
        setResponse('Please enter a search query');
      } else if (searchResults.data.length === 0) {
        setResponse(`No results found for ${enteredQuery}`);
      }
      setSearchResults(searchResults.data);
    } catch (err) {
      console.error(err);
    }
  };

  // get pending friend requests; called on load
  const getPendingRequests = async () => {
    try {
      const pendingRequests = await Axios.post('/api/user/getPendingRequests', {
        username: currentUser.username,
      });
      setPending(pendingRequests.data);
    } catch (err) {
      console.error(err);
    }
  };

  // gets friends list; called on load
  const getFriends = async () => {
    try {
      const friends = await Axios.post('api/user/friends', {
        username: currentUser.username,
      });
      setFriends(friends.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFriends();
    getPendingRequests();
  }, []);

  // sends friend request to specified user
  const sendFriendRequest = async (userId) => {
    try {
      const sendRequest = await Axios.post('/api/user/sendFriendRequest', {
        targetId: userId,
        selfUsername: currentUser.username,
      });
      setResponse(sendRequest);
    } catch (err) {
      console.log(err.response);
      setResponse(err.response);
    }
  };

  // accepts friend request from specified user
  const acceptRequest = async (userId) => {
    console.log(`accepting friend request from ${userId}`);

    try {
      await Axios.post('/api/user/removeRequest', {
        selfUsername: currentUser.username,
        targetId: userId,
      });
      await getPendingRequests();

      const addUser = await Axios.post('/api/user/addUser', {
        selfUsername: currentUser.username,
        targetId: userId,
      });

      //setResponse(addUser.response);
      await getFriends();
    } catch (err) {
      setResponse(err.response);
      console.error(err);
    }
  };

  // rejects friend request from specified user
  const rejectRequest = async (userId) => {
    console.log(`rejecting request from ${userId}`);
    try {
      await Axios.post('/api/user/removeRequest', {
        selfUsername: currentUser.username,
        targetId: userId,
      });
      await getPendingRequests();
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
          {response !== '' && (
            <Form.Text>{response.data.statusMessage}</Form.Text>
          )}
        </Form>
        <div style={popupBodyStyle}>
          {searchResults.map((f) => (
            <PopupUser key={f.userId} username={f.username}>
              <PersonAddIcon
                style={iconStyle}
                onClick={() => {
                  getPendingRequests();
                  sendFriendRequest(f.userId);
                }}
              />
            </PopupUser>
          ))}
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
      <Row className="d-flex justify-content-between mb-4 ">
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
          {pendingFriendRequests.length !== 0 && (
            <ErrorOutlineIcon className="mb-3" style={{ color: '#d400e5' }} />
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
                <PersonAddIcon className="mr-2" style={{ color: '#979696' }} />
                Add Friend
              </Button>
            </OverlayTrigger>
          </div>
        </Col>
      </Row>
      {friends.map((f) => (
        <FriendItem
          key={f.userId}
          userId={f.userId}
          username={f.username}
          updateFriends={getFriends}
        />
      ))}
    </div>
  );
};

export default FriendsBody;
