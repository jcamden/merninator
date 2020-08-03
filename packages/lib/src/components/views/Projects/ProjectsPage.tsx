import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthStateInterface, IDispatch, Projects, ProjectsActionTypes } from '@merninator/types';
import React, { useEffect, useState } from 'react';

import { NewProjectButton } from './NewProjectButton';
import { NewProjectModal } from './NewProjectModal';
import { Project } from './Project';

interface ProjectsPageProps {
  dispatch: IDispatch;
  server: string;
  projects: Projects;
  user: AuthStateInterface['user'];
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ dispatch, server, projects, user }) => {
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
      const usersProjects = await get<Projects>(`${server}${user?.self}/projects`);
      console.log(usersProjects);
      const sortedProjects = usersProjects.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
      dispatch({
        type: ProjectsActionTypes.setProjects,
        payload: sortedProjects,
      });
    })();
  }, [dispatch, server, user]);

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
          {projects &&
            projects.map(project => <Project key={project.self} {...project} dispatch={dispatch} server={server} />)}
        </div>
      </div>
      {creatingNewProject && (
        <NewProjectModal setCreatingNewProject={setCreatingNewProject} dispatch={dispatch} server={server} />
      )}
    </>
  );
};
