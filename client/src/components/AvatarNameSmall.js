import React from 'react';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const AvatarNameSmall = () => {
  return (
    <div className="d-flex flex-row p-1">
      <AccountCircleIcon fluid style={{ fontSize: 60 }} />
      <div className="align-self-center m-3 pl-2">
        <label>Some User</label>
      </div>
    </div>
  );
};

export default AvatarNameSmall;
