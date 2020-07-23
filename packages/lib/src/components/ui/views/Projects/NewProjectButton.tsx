import React, { useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface NewProjectButtonProps {
  children: ReactNode;
  setCreatingNewProject: Dispatch<SetStateAction<boolean>>;
}

const NewProjectButton: React.FC<NewProjectButtonProps> = ({ children, setCreatingNewProject }) => {
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
export default NewProjectButton;
