import { AuthActions } from './AuthTypes';
import { AppActions } from './AppTypes';
import { ProjectsActions } from './ProjectTypes';

export type IDispatch = (arg0: AuthActions | AppActions | ProjectsActions) => void;

export type FormWithDispatch<T> = (formData: T, dispatch: IDispatch) => Promise<void>;

// interface RegisterForm {
//   givenName: string;
//   familyName: string;
//   email: string;
//   password: string;
//   password2: string;
// }

// interface LoginForm {
//   email: string;
//   password: string;
// }

// export type RegisterUser = FormWithDispatch<RegisterForm>;

// export type LoginUser = FormWithDispatch<LoginForm>;
