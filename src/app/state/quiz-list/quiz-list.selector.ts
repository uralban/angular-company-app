import {createFeatureSelector, createSelector} from '@ngrx/store';
import {QuizListState} from './quiz-list.state';

export const quizListFeatureKey = 'quizListData';

export const selectQuizListStore = createFeatureSelector<QuizListState>(quizListFeatureKey);

export const selectQuizListData = createSelector(
  selectQuizListStore,
  (state: QuizListState) => state.quizListData,
);
