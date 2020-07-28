import React, { useState, Dispatch, SetStateAction, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ProjectsDispatchContext } from '../../../context/projects/ProjectsState';
import Axios from 'axios';
import { AuthStateContext } from '../../../context/auth/AuthState';
import { SERVER } from '../../../settings';

interface NewProjectModalProps {
  setCreatingNewProject: Dispatch<SetStateAction<boolean>>;
}

interface FormData {
  title: string;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({ setCreatingNewProject }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const projectDispatch = useContext(ProjectsDispatchContext);
  const { user } = useContext(AuthStateContext);

  const { register, handleSubmit, errors } = useForm<FormData>({ mode: 'onBlur' });

  const onSubmit = async (data: FormData): Promise<void> => {
    try {
      await Axios.post(`${SERVER}/project`, data);

      projectDispatch({ type: 'addProject', payload: { ...data, completed: false } });
      setCreatingNewProject(false);
    } catch (error) {}
  };

  const close = () => {
    setCreatingNewProject(false);
  };

  return (
    <div
      className="position-absolute d-flex justify-content-between align-items-center"
      style={{
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 49, 194, .5)',
      }}
    >
      <div></div>
      <div className="modal-dialog w-50" role="document">
        <div className="modal-content">
          <div className="modal-header font-header">
            <h3 className="modal-title">Create a Project</h3>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={(): void => close()}
            >
              <span aria-hidden="true" style={{ fontSize: '2rem' }}>
                &times;
              </span>
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body">
              <input
                name="title"
                type="text"
                placeholder="title"
                className={`w-100 ${errors.title && 'inputError'}`}
                ref={register({
                  required: 'title required',
                })}
              />
            </div>
            <div className="modal-footer">
              <button className="submit btn btn-primary btn-block" type="submit" disabled={loading}>
                {success ? 'Created' : loading ? 'Creating...' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div></div>
    </div>
  );
};
