export type Login = (formData: { email: string; password: string }) => Promise<void>;

export interface User {
  self: string;
  email: string;
  givenName: string;
  familyName: string;
  _v?: number;
}

export interface AuthStateInterface {
  user?: User;
  authError: string;
  checkedAuth: boolean;
  authLoading: boolean;
}

export interface LoginSuccess {
  success: boolean;
  user: User;
  token: string;
  expiresIn: string;
}

export enum AuthActionTypes {
  login = 'login',
  logOut = 'logOut',
  registerFail = 'registerFail',
  authLoading = 'authLoading',
  authNotLoading = 'authNotLoading',
  noToken = 'noToken',
  registerSuccess = 'registerSuccess',
  loginSuccess = 'loginSuccess',
  loginFail = 'loginFail',
  field = 'field',
  userLoaded = 'userLoaded',
  authError = 'authError',
}

export type AuthActions =
  | {
      type:
        | AuthActionTypes.login
        | AuthActionTypes.logOut
        | AuthActionTypes.registerFail
        | AuthActionTypes.authLoading
        | AuthActionTypes.authNotLoading
        | AuthActionTypes.noToken;
      payload: {};
    }
  | { type: AuthActionTypes.registerSuccess; payload: LoginSuccess }
  | { type: AuthActionTypes.registerFail; payload: string }
  | { type: AuthActionTypes.loginSuccess; payload: LoginSuccess }
  | { type: AuthActionTypes.loginFail; payload: string }
  // gonna need to move fieldName to payload
  | { type: AuthActionTypes.field; payload: { fieldName: 'email' | 'password'; value: string } }
  | { type: AuthActionTypes.userLoaded; payload: { user: User } }
  | { type: AuthActionTypes.authError; payload: string };
