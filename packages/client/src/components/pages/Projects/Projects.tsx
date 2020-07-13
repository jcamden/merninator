import React, { useContext } from 'react';
import TodoItem from './Project';
import { ProjectsStateContext } from '../../../context/projects/ProjectsState';

const TodoPage: React.FC = () => {
  const { projects } = useContext(ProjectsStateContext);

  return (
    <div className="container">
      <div className="card text-center p-5">
        <h2>Todo:</h2>
        {projects.map(project => (
          <TodoItem key={project.title} {...project} />
        ))}
      </div>
    </div>
  );
};

export default TodoPage;
