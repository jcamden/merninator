import React, { useContext, useEffect, useState } from 'react';
import { Project } from './Project';
import { ProjectsStateContext, ProjectsDispatchContext } from '../../../../context/projects/ProjectsState';
import { AuthStateContext } from '../../../../context/auth/AuthState';
import { Projects } from '../../../../context/projects/types';
import { SERVER } from '../../../../settings';
import { NewProjectButton } from './NewProjectButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NewProjectModal } from './NewProjectModal';

export const ProjectsPage: React.FC = () => {
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
      projectsDispatch({ type: 'setProjects', payload: usersProjects });
    })();
  }, [projectsDispatch, user]);

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
          {projects && projects.map(project => <Project key={project.title} {...project} />)}
        </div>
      </div>
      {creatingNewProject && <NewProjectModal setCreatingNewProject={setCreatingNewProject} />}
    </>
  );
};
