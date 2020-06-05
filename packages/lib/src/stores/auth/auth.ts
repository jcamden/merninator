import create, { SetState, GetState } from 'zustand';

export interface AuthStateProps {
  count: number;
  increase: () => void;
  test: () => string;
}

export const [authState] = create<AuthStateProps>(
  (setState: SetState<AuthStateProps>, getState: GetState<AuthStateProps>): AuthStateProps => {
    return {
      count: 0,
      increase: (): void => setState(state => ({ count: state.count + 1 })),
      test: (): string => getState().count.toString(),
    };
  },
);
