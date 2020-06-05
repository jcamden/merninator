import create, { SetState, GetState } from 'zustand';
import produce from 'immer';

export interface AuthStateProps {
  count: number;
  increase: () => void;
  getTest: () => string;
  nest: { project: { pages: [{ index: { author: string[] } }] } };
  string2nest: (string: string) => void;
}

export const [authState] = create<AuthStateProps>(
  (setState: SetState<AuthStateProps>, getState: GetState<AuthStateProps>): AuthStateProps => {
    return {
      count: 0,
      increase: (): void => setState(state => ({ count: state.count + 1 })),
      getTest: (): string => getState().count.toString(),
      nest: { project: { pages: [{ index: { author: ['Kyler'] } }] } },
      string2nest: (string: string): void => {
        const nextNest = produce(getState().nest, draftNest => {
          draftNest.project.pages[0].index.author.push(string);
        });
        setState(() => ({ nest: nextNest }));
      },
    };
  },
);
