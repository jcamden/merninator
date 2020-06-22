import React from 'react';
import { Nav } from 'react-bootstrap';

const UnauthdLinks = () => {
  return (
    <>
      <Nav.Link href="login" className="navbar-right">
        Login
      </Nav.Link>
      <Nav.Link href="register">Register</Nav.Link>
    </>
  );
};

export default UnauthdLinks;
