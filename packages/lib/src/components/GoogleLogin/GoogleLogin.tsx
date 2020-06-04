import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface GoogleLoginProps {
  children?: string;
  onClick?: any;
}

const GoogleLogin = ({ children }: GoogleLoginProps) => {
  return (
    <Button variant='danger'>
      <FontAwesomeIcon icon={["fab", "google"]} className='mr-2' />
      Login with Google
    </Button>
  );
};

export default GoogleLogin;
