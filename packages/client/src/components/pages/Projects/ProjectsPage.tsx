import React, { useContext, useEffect, useState } from 'react';
import { Project } from './Project';
import { ProjectsStateContext, ProjectsDispatchContext } from '../../../context/projects/ProjectsState';
import { AuthStateContext } from '../../../context/auth/AuthState';
import { SERVER } from '../../../settings';
import { NewProjectButton } from './NewProjectButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NewProjectModal } from './NewProjectModal';
import { AuthActions, AppActions, Projects, ProjectsActions, ProjectsActionTypes } from '@merninator/types';

interface ProjectsPageProps {
  dispatch: (arg0: AuthActions | AppActions | ProjectsActions) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ dispatch }) => {
  const { projects } = useContext(ProjectsStateContext);
  const projectsDispatch = useContext(ProjectsDispatchContext);
  const { user } = useContext(AuthStateContext);

  const [creatingNewProject, setCreatingNewProject] = useState(false);

  useEffect(() => {
    (async (): Promise<void> => {
      // Wrote this to use fetch instead of Axios so that I could specify the type of the response without crazy acrobatics.
      // I had intended to make this a util and convert all other types of Axios requests to fetch as well.
      // Will do that soon.
      async function get<T>(request: RequestInfo): Promise<T> {
        const response = await fetch(request, { headers: { Authorization: localStorage.token } });
        const body = await response.json();
        return body;
      }
      const usersProjects = await get<Projects>(`${SERVER}${user?.self}/projects`);
      console.log(usersProjects);
      const sortedProjects = usersProjects.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
      projectsDispatch({
        type: ProjectsActionTypes.setProjects,
        payload: sortedProjects,
      });
    })();
  }, []);

  return (
    <>
      <div className="container">
        <div className="card text-center p-5">
          <NewProjectButton setCreatingNewProject={setCreatingNewProject}>
            {' '}
            Projects{' '}
            <FontAwesomeIcon
              style={{
                filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))',
                WebkitFilter: 'drop-shadow( 2px 2px .5px #b3dbab)',
              }}
              className="text-success"
              icon="plus-square"
            />
          </NewProjectButton>
          {projects && projects.map(project => <Project key={project.self} {...project} dispatch={dispatch} />)}
        </div>
      </div>
      {creatingNewProject && <NewProjectModal setCreatingNewProject={setCreatingNewProject} dispatch={dispatch} />}
    </>
  );
};
