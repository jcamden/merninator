import { IDispatch } from '@merninator/types';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ModalRHFProps {
  dispatch: IDispatch;
  modalRHFOnSubmit: <T>(
    data: T,
    dispatch: IDispatch,
    server: string,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setModalOpen: Dispatch<SetStateAction<boolean>>,
    setSuccess: Dispatch<SetStateAction<boolean>>,
    submitUrl: string,
    success: boolean,
  ) => Promise<void>;
  server: string;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  submitURL: string;
}

interface FormData {
  title: string;
}

export const ModalRHF: React.FC<ModalRHFProps> = ({ dispatch, modalRHFOnSubmit, server, setModalOpen, submitURL }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, errors } = useForm<FormData>({ mode: 'onBlur' });

  const onSubmit = async (data: FormData): Promise<void> => {
    modalRHFOnSubmit<FormData>(data, dispatch, server, setLoading, setModalOpen, setSuccess, submitURL, success);
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
            <button type="button" className="close" onClick={(): void => setModalOpen(false)}>
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
