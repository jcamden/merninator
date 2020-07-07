import React, { useContext } from 'react';
import { StateContext, DispatchContext } from '../../context/auth/AuthState';

export const NavBar: React.FC = () => {
  const { user } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const logOut = (): void => {
    console.log('logout clicked');
    dispatch({ type: 'logOut' });
  };

  return (
    <nav className="navbar navbar-dark bg-primary">
      <a className="navbar-brand text-warning" href="#">
        Djinndex
      </a>
      <ul className="navbar-nav list-group">
        {user ? (
          <li className="list-group-item">
            <a href="/todos">Todos</a>
          </li>
        ) : (
          <>
            <li className="nav-item active list-group-item">
              <a className="text-warning" href="/login">
                Login
              </a>
            </li>
            <li className="nav-item active list-group-item">
              <a className="text-warning" href="/login">
                Register
              </a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
