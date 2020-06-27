import React, { useContext } from 'react';
import { StateContext, DispatchContext } from '../../context/auth/authContext';
import { ensureType, login } from '../../utils';

const AuthTest: React.FC = ({}) => {
  const { username, password, isLoading, error, isLoggedIn } = ensureType(useContext(StateContext));
  const dispatch = ensureType(useContext(DispatchContext));

  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

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
            <button className="btn btn-primary" onClick={(): void => dispatch({ type: 'logOut' })}>
              Log Out
            </button>
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
};

AuthTest.propTypes = {};

export default AuthTest;
