import React, { useContext, useEffect, useState } from 'react';
import { Project } from './Project';
import { ProjectsStateContext, ProjectsDispatchContext } from '../../../context/projects/ProjectsState';
import { AuthStateContext } from '../../../context/auth/AuthState';
import { Projects } from '@merninator/types';
import { SERVER } from '../../../settings';
import { NewProjectButton } from './NewProjectButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NewProjectModal } from './NewProjectModal';
import { AuthActions, AppActions } from '@merninator/types';

interface ProjectsPageProps {
  dispatch: (arg0: AuthActions | AppActions) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ dispatch }) => {
  const { projects } = useContext(ProjectsStateContext);
  const projectsDispatch = useContext(ProjectsDispatchContext);
  const { user } = useContext(AuthStateContext);

  const [creatingNewProject, setCreatingNewProject] = useState(false);

  useEffect(() => {
    (async (): Promise<void> => {
      async function get<T>(request: RequestInfo): Promise<T> {
        const response = await fetch(request, { headers: { Authorization: localStorage.token } });
        const body = await response.json();
        return body;
      }
      const usersProjects = await get<Projects>(`${SERVER}${user?.self}/projects`);
      console.log(usersProjects);
      projectsDispatch({
        type: 'setProjects',
        payload: usersProjects.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)),
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
          {projects && projects.map(project => <Project key={project.title} {...project} dispatch={dispatch} />)}
        </div>
      </div>
      {creatingNewProject && <NewProjectModal setCreatingNewProject={setCreatingNewProject} />}
    </>
  );
};
