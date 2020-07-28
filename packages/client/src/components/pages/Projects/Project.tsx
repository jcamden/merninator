import React, { useContext } from 'react';
import { ProjectsDispatchContext } from '../../../context/projects/ProjectsState';
import { AuthActions } from '../../../context/auth/types';
import { AppActions } from '../../../context/app/types';

interface ProjectProps {
  title: string;
  completed: boolean;
  dispatch: (arg0: AuthActions | AppActions) => void;
}

export const Project: React.FC<ProjectProps> = ({ title, completed }) => {
  const projectsDispatch = useContext(ProjectsDispatchContext);

  return (
    <div className="todoItem">
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
