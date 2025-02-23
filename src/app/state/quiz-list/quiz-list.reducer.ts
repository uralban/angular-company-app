import {Action, createReducer, on} from '@ngrx/store';
import {initialState, QuizListState} from '../quiz-list';
import * as QuizListDataActions from '../quiz-list/quiz-list.actions';

const QuizListDataReducer = createReducer(
  initialState,
  on(QuizListDataActions.quizListDataClear, (state, {}) => {
    return {
      ...state,
      quizListData: null,
    }
  }),
  on(QuizListDataActions.quizListDataSuccess, (state, {quizListData}) => {
    return {
      ...state,
      quizListData,
    };
  }),
);

export function quizListReducerFn(state: QuizListState | undefined, action: Action) {
  return QuizListDataReducer(state, action);
}
