import React, { useContext } from 'react';
import TodoItem from './TodoItem';
import { AuthStateContext } from '../../../context/auth/AuthState';

const TodoPage: React.FC = () => {
  const { todos } = useContext(AuthStateContext);

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

export default TodoPage;
