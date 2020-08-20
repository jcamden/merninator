import { action } from '@storybook/addon-actions';
import React from 'react';

import { ModalRHF } from './ModalRHF';
import { modalRHFOnSubmitTEST } from './modalRHFOnSubmitTEST';

export default {
  title: 'organisms/ModalRHF',
  component: ModalRHF,
};

export const createAProject = () => (
  <ModalRHF
    dispatch={action('dispatch')}
    formFields={[{ title: 'title', type: 'text', placeholder: 'title', validation: { required: 'title required' } }]}
    modalRHFOnSubmit={modalRHFOnSubmitTEST}
    server={'https://domain'}
    setModalOpen={action('close')}
    submitButtonTexts={{ default: 'Create Project', loading: 'Creating Project', success: 'Project Created' }}
    submitURL="/api/url"
    title="Create a Project"
  />
);
