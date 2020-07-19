import { IProjectsState, ProjectsActions } from './types';
import Axios from 'axios';

const projectsReducer = (draft: IProjectsState, action: ProjectsActions): void => {
  switch (action.type) {
    // Set projects is called when the projects page loads
    // If there are no projects matching the User._id, the state.projects ends up undefined
    case 'setProjects': {
      draft.projects = action.payload;
      return;
    }
    case 'addProject': {
      // If state.projects is not undefined as per init setProjects, push; otherwise, newly define it.
      draft.projects ? draft.projects.push(action.payload) : (draft.projects = [action.payload]);
      return;
    }
    case 'removeProject': {
      draft.projects.filter(project => project !== action.payload);
      return;
    }
    case 'toggleProjectCompleted': {
      const index = draft.projects.findIndex(item => item.title === action.payload);
      draft.projects[index].completed = !draft.projects[index].completed;
      return;
    }
  }
};

export default projectsReducer;
