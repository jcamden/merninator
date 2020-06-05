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
  const getTest = authState((state: AuthStateProps) => state.getTest);
  const nest = authState((state: AuthStateProps) => state.nest);
  const string2nest = authState((state: AuthStateProps) => state.string2nest);
  return (
    <Button
      variant="danger"
      onClick={(): void => {
        increase();
        console.log(getTest());
        string2nest(' kitty');
      }}
    >
      <FontAwesomeIcon icon={['fab', 'google']} className="mr-2" />
      {count} {children} {nest.project.pages[0].index.author.map((author: string) => author)}
    </Button>
  );
};

export default StateTest;
