import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface GoogleLoginProps {
  children?: string;
  onClick?: () => void;
}

const GoogleLogin: React.FC<GoogleLoginProps> = ({ children }: GoogleLoginProps) => {
  return (
    <Button variant="danger">
      <FontAwesomeIcon icon={['fab', 'google']} className="mr-2" />
      Login with Google{children}
    </Button>
  );
};

export default GoogleLogin;
