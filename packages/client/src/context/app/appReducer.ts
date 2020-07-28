import { AppStateInterface, AppActions } from '@merninator/types';

export const appReducer = (draft: AppStateInterface, action: AppActions): void => {
  switch (action.type) {
    case 'changePage': {
      draft.page = action.payload;
      return;
    }
  }
};
