import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import { StateContext } from '../context/auth/authContext';
import { LoginState } from '../context/auth/types';
import { ensure } from '../utils';

const TodoPage: React.FC = () => {
  const { todos } = ensure(
    useContext<LoginState | undefined>(StateContext),
    'StateContext was undefined. Oh. My. God.',
  );

  return (
    <div className="container">
      <div className="card text-center p-5">
        <h2>Todo:</h2>
        {todos.map(item => (
          <TodoItem key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
};

TodoPage.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default TodoPage;
