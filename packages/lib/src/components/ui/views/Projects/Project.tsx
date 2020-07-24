import React, { useContext } from 'react';
import { ProjectsDispatchContext } from '../../../../context/projects/ProjectsState';

export type ProjectProps = {
  title: string;
  completed: boolean;
};

export const Project: React.FC<ProjectProps> = ({ title, completed }) => {
  const projectsDispatch = useContext(ProjectsDispatchContext);

  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={(): void => {
          projectsDispatch({ type: 'toggleProjectCompleted', payload: title });
        }}
      />
      {` `}
      {title}
    </div>
  );
};
