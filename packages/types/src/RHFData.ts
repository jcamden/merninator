import { IDispatch } from '@merninator/types';
import { Dispatch, SetStateAction } from 'react';

export type ModalRHFOnSubmit = <T>(
  data: T,
  dispatch: IDispatch,
  server: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setModalOpen: Dispatch<SetStateAction<boolean>>,
  setSuccess: Dispatch<SetStateAction<boolean>>,
  submitURL: string,
  success: boolean,
) => Promise<void>;

export type RHFModalDataAddProject = { title: string; pdf: any };
