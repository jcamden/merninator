import { IDispatch, ProjectsActionTypes, RHFModalDataAddProject } from '@merninator/types';
import Axios from 'axios';
import { Dispatch, SetStateAction } from 'react';

export const modalRHFOnSubmit = async <T>(
  // We need to enumerate all types of data that will be passed through here (the shapes of the forms)
  data: T,
  dispatch: IDispatch,
  server: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setModalOpen: Dispatch<SetStateAction<boolean>>,
  setSuccess: Dispatch<SetStateAction<boolean>>,
  submitURL: string,
  success: boolean,
): Promise<void> => {
  // same button closes modal after submitting form
  if (success) {
    setModalOpen(false);
  } else {
    // submit form:
    try {
      setLoading(true);
      const res = await Axios.post(`${server}${submitURL}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // type guard: type of RHF data directs flow to appropriate action
      const isAddProjectData = (data: RHFModalDataAddProject | T): data is RHFModalDataAddProject =>
        (data as RHFModalDataAddProject).title !== undefined;

      if (isAddProjectData(data)) {
        console.log(res.data._id);
        console.log(data.pdf[0]);

        const url = `${process.env.REACT_APP_SERVER}/project/upload/${res.data._id}`;
        const formData = new FormData();
        // gonna be passed to upload backend as 'file':
        formData.append('file', data.pdf[0]);

        await Axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        dispatch({
          type: ProjectsActionTypes.addProject,
          payload: {
            ...data,
            completed: false,
            createdAt: `placeholder: ${new Date().toString()}`,
            self: `placeholder: ${new Date().toString()}`,
            updatedAt: `placeholder: ${new Date().toString()}`,
          },
        });
        setLoading(false);
        setSuccess(true);
      } else {
        throw new Error('unexpected data type');
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export type ModalRHFOnSubmit = typeof modalRHFOnSubmit;
