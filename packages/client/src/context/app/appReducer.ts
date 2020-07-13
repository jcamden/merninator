import { AppStateInterface, AppActions } from './types';

export default function appReducer(draft: AppStateInterface, action: AppActions): void {
  switch (action.type) {
    case 'changePage': {
      draft.page = action.payload;
      return;
    }
  }
}
