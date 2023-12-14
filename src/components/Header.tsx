import React from 'react';
import Theme from './Theme';
import Logo from './logo';

function MainHeader() {
  return (
    <header style={{ width: '100%' }}>
      <Logo />
      <Theme />
    </header>
  );
}
export default MainHeader;
