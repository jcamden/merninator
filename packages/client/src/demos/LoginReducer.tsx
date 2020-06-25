import React, { useReducer } from 'react';
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

type LoginAction =
  | { type: 'login' | 'success' | 'error' | 'logOut' }
  | { type: 'field'; fieldName: string; payload: string };

function loginReducer(state: LoginState, action: LoginAction): LoginState {
  switch (action.type) {
    case 'field': {
      // standard create new immutable state
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case 'login': {
      return {
        ...state,
        error: '',
        isLoading: true,
      };
    }
    case 'success': {
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
      };
    }
    case 'error': {
      return {
        ...state,
        error: 'Incorrect username or password!',
        isLoggedIn: false,
        isLoading: false,
        username: '',
        password: '',
      };
    }
    case 'logOut': {
      return {
        ...state,
        isLoggedIn: false,
      };
    }
    default:
      return state;
  }
}

export default function LoginUseReducer(): JSX.Element {
  const [state, dispatch] = useReducer(loginReducer, initialState);
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
