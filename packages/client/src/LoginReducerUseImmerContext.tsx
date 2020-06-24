// Dispatch imported for type definitions only
import React, { useContext, Dispatch } from 'react';
import PropTypes from 'prop-types';
import { useImmerReducer } from 'use-immer';
import { login, ensure } from './utils';

const todos = [
  {
    title: 'milk the fish',
    completed: true,
  },
  {
    title: 'clean the cheese',
    completed: false,
  },
  {
    title: 'oragnize the cat',
    completed: false,
  },
];

interface LoginState {
  [propName: string]: string | boolean | typeof todos;
  username: string;
  password: string;
  isLoading: boolean;
  error: string;
  isLoggedIn: boolean;
  variant: 'login' | 'forgetPassword';
  todos: { title: string; completed: boolean }[];
}

type LoginActions =
  | { type: 'login' | 'success' | 'error' | 'logOut' }
  | { type: 'field'; fieldName: string; payload: string }
  | { type: 'toggleTodoCompleted'; payload: string };

const initialState: LoginState = {
  username: '',
  password: '',
  isLoading: false,
  error: '',
  isLoggedIn: false,
  variant: 'login',
  todos,
};

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

    case 'toggleTodoCompleted': {
      const index = ensure(
        draft.todos.findIndex(item => item.title === action.payload),
        `couldn't find todo ${action.payload}`,
      );
      console.log(index);
      console.log(draft.todos[index].completed);
      draft.todos[index].completed = !draft.todos[index].completed;
      console.log(draft.todos[index].completed);
      return;
    }
    default:
      return;
  }
}

const StateContext = React.createContext<LoginState | undefined>(undefined);

// LoginAction may not be right there...
const DispatchContext = React.createContext<Dispatch<LoginActions> | undefined>(undefined);

// curried approach with immer; not needed with useImmerReducer hook
// const curriedLoginReducer = produce(loginReducer);

export default function LoginUseContext(): JSX.Element {
  // pass in immer curried reducer instead of reducer
  // const [state, dispatch] = useReducer(curriedLoginReducer, initialState);
  // or, with useImmerReducer hook:
  const [state, dispatch] = useImmerReducer(loginReducer, initialState);
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
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
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
          <TodoPage todos={state.todos} />
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

type TodosItemProps = {
  title: string;
  completed: boolean;
};

type TodosPageProps = {
  todos: TodosItemProps[];
};

const TodoPage: React.FC<TodosPageProps> = ({ todos }) => {
  return (
    <div className="todoContainer">
      <h2>Todos</h2>
      {todos.map(item => (
        <TodoItem key={item.title} {...item} />
      ))}
    </div>
  );
};

TodoPage.propTypes = {
  todos: PropTypes.array.isRequired,
};

const TodoItem: React.FC<TodosItemProps> = ({ title, completed }) => {
  const dispatch = useContext<Dispatch<LoginActions> | undefined>(DispatchContext);
  const state = useContext<LoginState | undefined>(StateContext);
  const isLoggedIn = ensure(state?.isLoggedIn, 'isLoggedIn was not defined in state');
  return (
    <div className="todoItem">
      <p>{title}</p>
      <div>
        <input
          type="checkbox"
          checked={completed}
          onClick={(): void => {
            if (!isLoggedIn) {
              alert('Please login to click this!');
            }
          }}
          onChange={(): void => {
            if (isLoggedIn) {
              // Typescript wrongly thinks dispatch can be undefined.
              // Satsify her thusly:
              ensure(dispatch, 'dispatch was undefined')({ type: 'toggleTodoCompleted', payload: title });
            }
          }}
        />
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};
