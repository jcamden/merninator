import { action } from '@storybook/addon-actions';
import React from 'react';

import { ModalRHF } from './ModalRHF';
import { modalRHFOnSubmitTEST } from './modalRHFOnSubmitTEST';

export default {
  title: 'organisms',
  component: ModalRHF,
};

export const modalRHF = () => (
  <ModalRHF
    dispatch={action('dispatch')}
    modalRHFOnSubmit={modalRHFOnSubmitTEST}
    server={'https://domain'}
    setModalOpen={action('close')}
    submitURL="/api/url"
  />
);
