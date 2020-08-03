import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react';

interface NewProjectButtonProps {
  children: ReactNode;
  setCreatingNewProject: Dispatch<SetStateAction<boolean>>;
}

export const NewProjectButton: React.FC<NewProjectButtonProps> = ({ children, setCreatingNewProject }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <h1
      style={{
        cursor: hovered ? 'pointer' : 'default',
      }}
      className={'d-inline my-0 mx-3'}
      onClick={(): void => setCreatingNewProject(true)}
      onMouseOver={(): void => setHovered(true)}
      onMouseOut={(): void => setHovered(false)}
    >
      {children}
    </h1>
  );
};
