import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { authState, AuthStateProps } from '../../stores/auth/auth';

interface StateTestProps {
  children?: string;
  onClick?: () => void;
}

export const StateTest: React.FC<StateTestProps> = ({ children }: StateTestProps) => {
  const count = authState((state: AuthStateProps) => state.count);
  const increase = authState((state: AuthStateProps) => state.increase);
  const test = authState((state: AuthStateProps) => state.test);
  return (
    <Button
      variant="danger"
      onClick={(): void => {
        increase();
        console.log(test());
      }}
    >
      <FontAwesomeIcon icon={['fab', 'google']} className="mr-2" />
      {count} {children}
    </Button>
  );
};

export default StateTest;
