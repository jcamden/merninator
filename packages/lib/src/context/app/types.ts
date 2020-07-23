export type Page = 'home' | 'login' | 'register' | 'todos' | 'projects' | 'editor' | 'profile';

export interface AppStateInterface {
  page: Page;
}

export type AppActions =
  | {
      type: 'changePage';
      payload: Page;
    }
  | { type: 'other' };
