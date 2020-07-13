import { ProjectsStateInterface, ProjectsActions } from './types';

export default function projectsReducer(draft: ProjectsStateInterface, action: ProjectsActions): void {
  switch (action.type) {
    case 'changeProjects': {
      draft.projects = action.payload;
      return;
    }
    case 'toggleProjectCompleted': {
      console.log('HERE');
      const index = draft.projects.findIndex(item => item.title === action.payload);
      draft.projects[index].completed = !draft.projects[index].completed;
      return;
    }
  }
}
