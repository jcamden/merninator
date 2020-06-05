import * as React from "react";
import { Navbar, Nav } from "react-bootstrap";
import AuthdLinks from "../../molecules/nav/NavLinks/AuthdLinks";
import UnauthdLinks from "../../molecules/nav/NavLinks/UnauthdLinks";
import Brand from "../../molecules/nav/Brand/Brand";

export interface DjNavbarProps {
  user: string;
  authd?: boolean;
  light?: boolean;
}

export default function DjNavbar({ user, authd, light }: DjNavbarProps) {
  return (
    <Navbar
      bg='primary'
      expand='lg'
      variant={light ? "light" : "dark"}
      className={`dark d-flex`}
    >
      <Brand />
      <Navbar.Toggle aria-controls='navlinks' />
      <Navbar.Collapse id='navlinks' className={`justify-content-end`}>
        <Nav>{authd ? <AuthdLinks user={user} /> : <UnauthdLinks />}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
