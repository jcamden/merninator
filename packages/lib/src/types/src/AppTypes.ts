export type Page = 'home' | 'login' | 'register' | 'todos' | 'projects' | 'editor' | 'profile';

export interface AppStateInterface {
  page: Page;
}

export enum AppActionTypes {
  changePage = 'changePage',
  other = 'other',
}

export type AppActions =
  | {
      type: AppActionTypes.changePage;
      payload: Page;
    }
  | { type: AppActionTypes.other; payload: {} };
