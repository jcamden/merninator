import React, { useContext, Dispatch } from 'react';
import PropTypes from 'prop-types';
import { DispatchContext, StateContext } from '../context/auth/authContext';
import { ensure } from '../utils';
import { LoginActions, LoginState } from '../context/auth/types';

export type TodoItemProps = {
  title: string;
  completed: boolean;
};

const TodoItem: React.FC<TodoItemProps> = ({ title, completed }) => {
  const dispatch = ensure(
    useContext<Dispatch<LoginActions> | undefined>(DispatchContext),
    'DispatchContext was undefined for some crazy reason.',
  );
  const state = ensure(
    useContext<LoginState | undefined>(StateContext),
    "StateContext was undefined. We're all going to die.",
  );
  const isLoggedIn = state.isLoggedIn;
  return (
    <div className="todoItem">
      <input
        type="checkbox"
        checked={completed}
        onClick={(): void => {
          if (!isLoggedIn) {
            alert('Please login to click this!');
          }
        }}
        onChange={(): void => {
          if (isLoggedIn) {
            // Typescript wrongly thinks dispatch can be undefined.
            // Satsify her thusly:
            dispatch({ type: 'toggleTodoCompleted', payload: title });
          }
        }}
      />
      {` `}
      {title}
    </div>
  );
};

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default TodoItem;
