import { createContext, Dispatch } from 'react';
import { LoginState, LoginActions } from './types';

export const StateContext = createContext<LoginState | undefined>(undefined);
export const DispatchContext = createContext<Dispatch<LoginActions> | undefined>(undefined);
