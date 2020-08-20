import { AppActions, AppStateInterface } from '@merninator/types';

export const appReducer = (draft: AppStateInterface, action: AppActions): void => {
  switch (action.type) {
    case 'changePage': {
      draft.page = action.payload;
      return;
    }
    case 'setModal': {
      draft.modal = action.payload;
      return;
    }
  }
};
