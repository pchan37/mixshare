import React from 'react';

import { AvatarNameSmall } from './';

const FriendItem = () => {
  return (
    <div className="d-flex flex-row">
      <AvatarNameSmall />
      <div className="mr-auto">Buttons</div>
    </div>
  );
};

export default FriendItem;
