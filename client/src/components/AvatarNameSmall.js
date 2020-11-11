import React from 'react';

import { AccountCircle } from '@material-ui/icons';

const AvatarNameSmall = () => {
  return (
    <div className="d-flex flex-row p-1">
      <AccountCircle fluid style={{ fontSize: 60 }} />
      <div className="align-self-center m-3 pl-2">
        <label>Some User</label>
      </div>
    </div>
  );
};

export default AvatarNameSmall;
