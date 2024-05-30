import React from 'react';
import logoImage from './logo.png';
import logoImamge2 from '.logo2.png'

function LogoComponent() {
  return (
      <img src={logoImage} alt="logo"/>,
      <img src={logoImage2} alt="logo2" />
  );
}

export default LogoComponent;