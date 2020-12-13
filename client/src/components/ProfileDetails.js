import React, { useContext, useState, useEffect } from 'react';
import Axios from 'axios';

import { Button } from 'react-bootstrap';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import { ProfileContext, UserContext } from '../contexts';

const ProfileDetails = () => {
  const { currentProfile } = useContext(ProfileContext);
  const { currentUser } = useContext(UserContext);
  const [areFriends, setAreFriends] = useState(false);

  const checkFriends = async () => {
    const { data: friendsRes } = await Axios.post('/api/user/friendsUserIds', {
      username: currentUser.username,
    });
    const { data: userRes } = await Axios.post('/api/user/getUserId', {
      username: currentProfile,
    });
    setAreFriends(friendsRes.includes(userRes));
  };

  useEffect(() => {
    checkFriends();
  }, []);

  const sendFriendRequest = async (targetUsername) => {
    try {
      const { data: targetId } = await Axios.post('/api/user/getUserId', {
        username: targetUsername,
      });
      const sendRequest = await Axios.post('/api/user/sendFriendRequest', {
        targetId,
        selfUsername: currentUser.username,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="d-flex flex-row mb-2" style={{ alignItems: 'center' }}>
        <AccountCircleIcon style={{ color: '#979696', fontSize: 200 }} />
        <h2>{currentProfile}'s Profile</h2>
        <Button
          variant="flat"
          disabled={
            currentProfile === currentUser.username || areFriends === true
              ? true
              : false
          }
          onClick={() => sendFriendRequest(currentProfile)}>
          <PersonAddIcon style={{ color: '#979696' }} />
        </Button>
      </div>
    </div>
  );
};

export default ProfileDetails;
