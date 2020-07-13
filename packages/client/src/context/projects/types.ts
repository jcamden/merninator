export type Projects = { title: string; completed: boolean }[];

export interface ProjectsStateInterface {
  projects: Projects;
}

export type ProjectsActions =
  | {
      type: 'changeProjects';
      payload: Projects;
    }
  | { type: 'other' }
  | { type: 'toggleProjectCompleted'; payload: string };
