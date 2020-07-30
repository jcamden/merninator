export interface Project {
  self: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export type Projects = Project[];

// Using I-prefix because ProjectsState is a thing
export interface IProjectsState {
  projects: Projects;
}

export enum ProjectsActionTypes {
  setProjects = 'setProjects',
  addProject = 'addProject',
  removeProject = 'removeProject',
  toggleProjectCompleted = 'toggleProjectCompleted',
}

export type ProjectsActions =
  | {
      type: ProjectsActionTypes.setProjects;
      payload: Projects;
    }
  | {
      type: ProjectsActionTypes.addProject;
      payload: Project;
    }
  | {
      type: ProjectsActionTypes.removeProject;
      payload: Project;
    }
  | { type: ProjectsActionTypes.toggleProjectCompleted; payload: string };
