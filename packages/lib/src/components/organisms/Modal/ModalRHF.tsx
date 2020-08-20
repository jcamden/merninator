import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IDispatch, ModalRHFOnSubmit } from '@merninator/types';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ModalRHFProps {
  dispatch: IDispatch;
  formFields: { placeholder: string; title: string; type: string; validation: { required?: string } }[];
  modalRHFOnSubmit: ModalRHFOnSubmit;
  server: string;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  submitButtonTexts: {
    default: string;
    loading: string;
    success: string;
  };
  submitURL: string;
  title: string;
}

interface FormData {
  title: string;
  pdf: any;
}

export const ModalRHF: React.FC<ModalRHFProps> = ({
  dispatch,
  formFields,
  modalRHFOnSubmit,
  server,
  setModalOpen,
  submitButtonTexts,
  submitURL,
  title,
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState('chews a file');

  const { register, handleSubmit, errors } = useForm<FormData>({ mode: 'onBlur' });

  const onSubmit = async (data: FormData): Promise<void> => {
    modalRHFOnSubmit<FormData>(data, dispatch, server, setLoading, setModalOpen, setSuccess, submitURL, success);
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setFileName(e.target.files[0].name);
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
            <h3 className="modal-title">{title}</h3>
            <button type="button" className="close" onClick={(): void => setModalOpen(false)}>
              <span aria-hidden="true" style={{ fontSize: '2rem' }}>
                &times;
              </span>
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body pb-0">
              {formFields.map((formField, index) => (
                <div className="input-group mb-3" key={`formGroup${index}${formField.title}`}>
                  <input
                    style={{ height: 'calc(2.25rem + 2px)' }}
                    name={formField.title}
                    type={formField.type}
                    placeholder={formField.placeholder}
                    className={`w-100 ${errors.title && 'inputError'}`}
                    ref={register(formField.validation)}
                  />
                </div>
              ))}
              {/* <h5 className="text-center mb-4">
                <FontAwesomeIcon icon="file-pdf" className="text-danger" /> Upload a PDF
              </h5> */}
              <div className="input-group mb-3">
                <div className="custom-file">
                  <input
                    className="custom-file-input"
                    id="pdf"
                    ref={register}
                    type="file"
                    name="pdf"
                    onChange={e => onChangeFile(e)}
                  />
                  <label
                    className={`custom-file-label ${fileName === 'chews a file' ? 'text-secondary' : 'text-dark'}`}
                    htmlFor="customFile"
                  >
                    {fileName}
                  </label>
                </div>
              </div>
              {/* <input ref={register} type="file" name="pdf" /> */}
            </div>
            <div className="modal-footer">
              <button
                className={`submit btn btn-block ${success ? 'btn-success' : 'btn-primary'}`}
                type="submit"
                disabled={loading}
              >
                {success ? submitButtonTexts.success : loading ? submitButtonTexts.loading : submitButtonTexts.default}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div></div>
    </div>
  );
};
