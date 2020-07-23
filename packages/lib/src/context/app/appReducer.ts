import { AppStateInterface, AppActions } from './types';

const appReducer = (draft: AppStateInterface, action: AppActions): void => {
  switch (action.type) {
    case 'changePage': {
      draft.page = action.payload;
      return;
    }
  }
};

export default appReducer;
