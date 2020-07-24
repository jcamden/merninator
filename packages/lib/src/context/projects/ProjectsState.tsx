import React, { ReactNode } from 'react';
import { useImmerReducer } from 'use-immer';
import { projectsReducer } from './projectsReducer';
import { createContext, Dispatch } from 'react';
import { IProjectsState, ProjectsActions } from './types';

const initialState: IProjectsState = {
  projects: [],
};

interface ProjectsStateProps {
  children: ReactNode;
}

export const ProjectsStateContext = createContext<IProjectsState>(initialState);
export const ProjectsDispatchContext = createContext<Dispatch<ProjectsActions>>(() => undefined);

export const ProjectsState = ({ children }: ProjectsStateProps): JSX.Element => {
  const [projectsState, projectsDispatch] = useImmerReducer(projectsReducer, initialState);

  return (
    <ProjectsDispatchContext.Provider value={projectsDispatch}>
      <ProjectsStateContext.Provider value={{ ...projectsState }}>{children}</ProjectsStateContext.Provider>
    </ProjectsDispatchContext.Provider>
  );
};
