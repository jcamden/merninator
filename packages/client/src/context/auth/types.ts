import { faVaadin } from "@fortawesome/free-brands-svg-icons";

// export interface Todos {
//   [index: number]: { title: string; completed: boolean };
// }

export type Todos = {
  title: string;
  completed: boolean;
}[];

export type Login = (formData: { email: string; password: string }) => Promise<void>;

export interface LoginState {
  // [propName: string]:
  //   | string
  //   | boolean
  //   | null
  //   | Todos
  //   | (() => Promise<void>)
  //   | ((formData: { email: string; password: string }) => Promise<void>)
  //   | undefined;
  user?: {};
  token: string | null;
  email: string;
  password: string;
  isLoading: boolean;
  error: string;
  variant: 'login' | 'forgetPassword';
  // I don't get why I can't just type this using the Todos interface (above)
  todos: Todos;
  checkedAuth?: boolean;
}

export interface User {
  _id: string;
  email: string;
  hash: string;
  salt: string;
  __v: number;
}

export interface LoginSuccess {
  success: boolean;
  user: User;
  token: string;
  expiresIn: string;
}

export type LoginActions =
  | { type: 'login' | 'success' | 'error' | 'logOut' | 'authError' | 'registerFail' | 'isLoading' | 'isNotLoading' }
  | { type: 'registerSuccess'; payload: LoginSuccess }
  | { type: 'registerFail'; payload: string }
  | { type: 'loginSuccess'; payload: LoginSuccess }
  | { type: 'loginFail'; payload: string }
  | { type: 'field'; fieldName: 'email' | 'password'; payload: string }
  | { type: 'toggleTodoCompleted'; payload: string }
  | { type: 'userLoaded'; payload: string }
  | { type: 'authError'; payload: string };