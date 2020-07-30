import React from 'react';
import Axios from 'axios';
import { AuthActions, AppActions, ProjectsActions, ProjectsActionTypes } from '@merninator/types';
import { SERVER } from '../../../settings';

type Dispatch = (arg0: AuthActions | AppActions | ProjectsActions) => void;

interface ProjectProps {
  self: string;
  title: string;
  completed: boolean;
  // I'm not doing anything with these dates, but, of course, you could.
  createdAt: string;
  updatedAt: string;
  dispatch: Dispatch;
}

const onChange = async (dispatch: Dispatch, self: string, completed: boolean): Promise<void> => {
  try {
    dispatch({ type: ProjectsActionTypes.toggleProjectCompleted, payload: self });
    await Axios.put(`${SERVER}${self}`, { completed: !completed });
  } catch (error) {
    dispatch({ type: ProjectsActionTypes.toggleProjectCompleted, payload: self });
    alert("Server error. You look nice today. As usual. Please don't leave me.");
  }
};

export const Project: React.FC<ProjectProps> = ({ self, title, completed, dispatch }) => {
  return (
    <div className="todoItem">
      <input
        type="checkbox"
        checked={completed}
        onChange={(): void => {
          onChange(dispatch, self, completed);
        }}
      />
      {` `}
      {title}
    </div>
  );
};
