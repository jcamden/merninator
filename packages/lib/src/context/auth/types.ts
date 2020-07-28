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
  logout = 'logout',
}

export type AuthActions =
  | {
      type: AuthActionTypes.login | 'logOut' | 'registerFail' | 'authLoading' | 'authNotLoading' | 'noToken';
    }
  | { type: 'registerSuccess'; payload: LoginSuccess }
  | { type: 'registerFail'; payload: string }
  | { type: 'loginSuccess'; payload: LoginSuccess }
  // | { type: 'googleLoginSuccess'; payload: { user: User } }
  | { type: 'loginFail'; payload: string }
  | { type: 'field'; fieldName: 'email' | 'password'; payload: string }
  | { type: 'userLoaded'; payload: { user: User } }
  | { type: 'authError'; payload: string };
