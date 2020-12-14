import React from 'react';
import { Image } from 'react-bootstrap';

import Logo from '../assets/images/logo-new.png';
import { SignUpLogin } from '../components';
import { BasicLayout } from '../layout';

const HomePage = () => {
  return (
    <BasicLayout>
      <div className="d-flex align-items-center h-100 justify-content-center">
        <div className="d-flex align-items-center h-100 p-5 w-50">
          <Image src={Logo} fluid />
        </div>

        <div className="d-flex flex-column align-items-center h-100 justify-content-center w-25">
          <SignUpLogin />
        </div>
      </div>
    </BasicLayout>
  );
};

export default HomePage;
