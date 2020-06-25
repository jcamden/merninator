import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../../components/TodoItem';
import { StateContext } from './authContext';
import { LoginState } from './types';
import { ensure } from '../../utils';

const TodoPage: React.FC = () => {
  const state = useContext<LoginState | undefined>(StateContext);

  const { todos } = ensure(state, 'state was tragically undefined');

  return (
    <div className="todoContainer">
      <h2>Todos</h2>
      {todos.map(item => (
        <TodoItem key={item.title} {...item} />
      ))}
    </div>
  );
};

TodoPage.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default TodoPage;
