import React, { ReactNode } from 'react';
import { useImmerReducer } from 'use-immer';
import projectsReducer from './projectsReducer';
import { createContext, Dispatch } from 'react';
import { ProjectsStateInterface, ProjectsActions } from './types';

const projects = [
  {
    title: 'milk the fish',
    completed: true,
  },
  {
    title: 'read the cheese',
    completed: false,
  },
  {
    title: 'organize the cat ninja',
    completed: false,
  },
  {
    title: 'create todos in DB linked to User and appropriate routes',
    completed: false,
  },
];

const initialState: ProjectsStateInterface = {
  projects: projects,
};

interface ProjectsStateProps {
  children: ReactNode;
}

export const ProjectsStateContext = createContext<ProjectsStateInterface>(initialState);
export const ProjectsDispatchContext = createContext<Dispatch<ProjectsActions>>(() => undefined);

export const ProjectsState = ({ children }: ProjectsStateProps): JSX.Element => {
  const [projectsState, projectsDispatch] = useImmerReducer(projectsReducer, initialState);

  return (
    <ProjectsDispatchContext.Provider value={projectsDispatch}>
      <ProjectsStateContext.Provider value={{ ...projectsState }}>{children}</ProjectsStateContext.Provider>
    </ProjectsDispatchContext.Provider>
  );
};
