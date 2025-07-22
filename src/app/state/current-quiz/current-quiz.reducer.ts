import {Action, createReducer, on} from '@ngrx/store';
import {CurrentQuizState, initialState} from '../current-quiz';
import * as CurrentQuizActions from '../current-quiz/current-quiz.actions';

const CurrentQuizReducer = createReducer(
  initialState,
  on(CurrentQuizActions.currentQuizClear, (state, {}) => {
    return {
      ...state,
      quiz: null,
    }
  }),
  on(CurrentQuizActions.currentQuizSuccess, (state, {quiz}) => {
    return {
      ...state,
      quiz,
    };
  }),
);

export function currentQuizReducerFn(state: CurrentQuizState | undefined, action: Action) {
  return CurrentQuizReducer(state, action);
}
