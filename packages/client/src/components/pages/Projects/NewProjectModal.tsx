import React, { Dispatch, useState, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import { SERVER } from '../../../settings';
import { AuthActions, AppActions, ProjectsActions, ProjectsActionTypes } from '@merninator/types';

interface NewProjectModalProps {
  setCreatingNewProject: Dispatch<SetStateAction<boolean>>;
  dispatch: (arg0: AuthActions | AppActions | ProjectsActions) => void;
}

interface FormData {
  title: string;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({ setCreatingNewProject, dispatch }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, errors } = useForm<FormData>({ mode: 'onBlur' });

  const close = (): void => {
    setCreatingNewProject(false);
  };

  const onSubmit = async (data: FormData): Promise<void> => {
    if (success) {
      close();
    } else {
      try {
        setLoading(true);
        await Axios.post(`${SERVER}/project`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        dispatch({
          type: ProjectsActionTypes.addProject,
          payload: {
            self: 'placeholder',
            ...data,
            completed: false,
            createdAt: 'placeholder',
            updatedAt: 'placeholder',
          },
        });
        setLoading(false);
        setSuccess(true);
      } catch (error) {}
    }
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
            <button type="button" className="close" onClick={(): void => close()}>
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
              <button
                className={`submit btn btn-block ${success ? 'btn-success' : 'btn-primary'}`}
                type="submit"
                disabled={loading}
              >
                {success ? 'Project Created' : loading ? 'Creating Project...' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div></div>
    </div>
  );
};
