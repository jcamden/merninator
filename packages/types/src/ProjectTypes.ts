export interface Project {
  _id: string;
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

export type ProjectsActions =
  | {
      type: 'setProjects';
      payload: Projects;
    }
  | {
      type: 'addProject';
      payload: Project;
    }
  | {
      type: 'removeProject';
      payload: Project;
    }
  | { type: 'toggleProjectCompleted'; payload: string };
