import React from "react";
import { Nav } from "react-bootstrap";

const UnauthdLinks = () => {
  return (
    <>
      <Nav.Link href='#home' className='navbar-right'>
        Login
      </Nav.Link>
      <Nav.Link href='#link'>Register</Nav.Link>
    </>
  );
};

export default UnauthdLinks;
