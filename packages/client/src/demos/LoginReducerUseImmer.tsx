import React from 'react';
import { useImmerReducer } from 'use-immer';
import { login } from '../utils';

const initialState: LoginState = {
  username: '',
  password: '',
  isLoading: false,
  error: '',
  isLoggedIn: false,
  variant: 'login',
};

interface LoginState {
  [propName: string]: string | boolean;
  username: string;
  password: string;
  isLoading: boolean;
  error: string;
  isLoggedIn: boolean;
  variant: 'login' | 'forgetPassword';
}

type LoginActions =
  | { type: 'login' | 'success' | 'error' | 'logOut' }
  | { type: 'field'; fieldName: string; payload: string };

// when curried via immer, you will be passsing draft instead of current state

// since mutations to state are tracked by immer return type void instead of LoginState
function loginReducer(draft: LoginState, action: LoginActions): void {
  // note: we don't destructure draft since we are actually mutating it
  switch (action.type) {
    case 'field': {
      // standard immer(but we be curryin now)
      // return produce<LoginState>(state, draft => {
      //   draft[action.fieldName] = action.payload;
      // });

      draft[action.fieldName] = action.payload;
      return;
    }
    case 'login': {
      draft.error = '';
      draft.isLoading = true;
      return;
    }
    case 'success': {
      draft.isLoggedIn = true;
      draft.isLoading = false;
      return;
    }
    case 'error': {
      draft.error = 'Incorrect username or password!';
      draft.isLoggedIn = false;
      draft.isLoading = false;
      draft.username = '';
      draft.password = '';
      return;
    }
    case 'logOut': {
      draft.isLoggedIn = false;
      return;
    }
    default:
      return;
  }
}

// curried approach with immer; not needed with useImmerReducer hook
// const curriedLoginReducer = produce(loginReducer);

export default function LoginUseReducer(): JSX.Element {
  // pass in immer curried reducer instead of reducer
  // const [state, dispatch] = useReducer(curriedLoginReducer, initialState);
  // or, with useImmerReducer hook:
  const [state, dispatch] = useImmerReducer(loginReducer, initialState);
  console.log(typeof dispatch);
  const { username, password, isLoading, error, isLoggedIn } = state;

  // return type of Promise required for async function, even with no return...
  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    dispatch({ type: 'login' });

    try {
      await login({ username, password });
      dispatch({ type: 'success' });
    } catch (error) {
      dispatch({ type: 'error' });
    }
  };

  return (
    <div className="container text-center p-3">
      <div className="card p-5">
        {isLoggedIn ? (
          <>
            <h1>Welcome {username}!</h1>
            <button onClick={(): void => dispatch({ type: 'logOut' })}>Log Out</button>
          </>
        ) : (
          <form onSubmit={onSubmit}>
            {error && <p className="error">{error}</p>}
            <p>Please Login!</p>
            <div className="form-group">
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e): void =>
                  dispatch({
                    type: 'field',
                    fieldName: 'username',
                    payload: e.currentTarget.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="password"
                autoComplete="new-password"
                value={password}
                onChange={(e): void =>
                  dispatch({
                    type: 'field',
                    fieldName: 'password',
                    payload: e.currentTarget.value,
                  })
                }
              />
            </div>
            <button className="submit btn btn-primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
