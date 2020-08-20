// export type Page = 'home' | 'login' | 'register' | 'todos' | 'projects' | 'editor' | 'profile';

export type Page = string;

export type Modal = '' | 'login' | 'register';

export interface AppStateInterface {
  page: Page;
  modal: Modal;
  onSetQsPage: (newValue: string) => void;
}

export enum AppActionTypes {
  changePage = 'changePage',
  setModal = 'setModal',
}

export type AppActions =
  | {
      type: AppActionTypes.changePage;
      payload: Page;
    }
  | { type: AppActionTypes.setModal; payload: Modal };
