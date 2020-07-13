import React, { useContext } from 'react';
import { AuthDispatchContext, AuthStateContext } from '../../../context/auth/AuthState';

export type TodoItemProps = {
  title: string;
  completed: boolean;
};

const TodoItem: React.FC<TodoItemProps> = ({ title, completed }) => {
  const authDispatch = useContext(AuthDispatchContext);
  const { user } = useContext(AuthStateContext);

  return (
    <div className="todoItem">
      <input
        type="checkbox"
        checked={completed}
        onClick={(): void => {
          if (!user) {
            alert('Please login to click this!');
          }
        }}
        onChange={(): void => {
          if (user) {
            // Typescript wrongly thinks authDispatch can be undefined.
            // Satsify her thusly:
            authDispatch({ type: 'toggleTodoCompleted', payload: title });
          }
        }}
      />
      {` `}
      {title}
    </div>
  );
};

export default TodoItem;
