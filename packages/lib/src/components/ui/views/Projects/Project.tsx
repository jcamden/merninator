import React, { useContext } from 'react';
import { ProjectsDispatchContext } from '../../../../context/projects/ProjectsState';

export type TodoItemProps = {
  title: string;
  completed: boolean;
};

const TodoItem: React.FC<TodoItemProps> = ({ title, completed }) => {
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

export default TodoItem;
