import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zustandTestState, ZustandTestStateProps } from '../../../zustand/store';

interface ZustandTestProps {
  children?: string;
  onClick?: () => void;
}

export const ZustandTest: React.FC<ZustandTestProps> = ({ children }: ZustandTestProps) => {
  const count = zustandTestState((state: ZustandTestStateProps) => state.count);
  const increase = zustandTestState((state: ZustandTestStateProps) => state.increase);
  const getTest = zustandTestState((state: ZustandTestStateProps) => state.getTest);
  const nest = zustandTestState((state: ZustandTestStateProps) => state.nest);
  const string2nest = zustandTestState((state: ZustandTestStateProps) => state.string2nest);
  return (
    <button
      type="button"
      className="btn btn-danger"
      onClick={(): void => {
        increase();
        console.log(getTest());
        string2nest(' clicked');
      }}
    >
      <FontAwesomeIcon icon={['fab', 'google']} className="mr-2" />
      {count} {children} {nest.project.pages[0].index.author.map((author: string) => author)}
    </button>
  );
};
