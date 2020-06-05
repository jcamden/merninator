import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";

interface AuthdLinksProps {
  user: string;
}

const AuthdLinks = ({ user }: AuthdLinksProps) => {
  return (
    <>
      <Nav.Link href='#home' className='navbar-right'>
        Projects
      </Nav.Link>
      <Nav.Link href='#link'>Editor</Nav.Link>
      <NavDropdown alignRight title={user} id='basic-nav-dropdown'>
        <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
        <NavDropdown.Item href='#action/3.2'>Another action</NavDropdown.Item>
        <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href='#action/3.4'>Separated link</NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default AuthdLinks;
