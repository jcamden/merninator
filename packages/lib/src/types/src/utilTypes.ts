import { AuthActions } from './AuthTypes';
import { AppActions } from './AppTypes';

export type RegisterUser = (
  data: {
    givenName: string;
    familyName: string;
    email: string;
    password: string;
    password2: string;
  },
  dispatch: (arg0: AuthActions | AppActions) => void,
) => Promise<void>;
