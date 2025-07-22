import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CurrentQuizState} from './current-quiz.state';

export const currentQuizFeatureKey = 'currentQuizData';

export const selectCurrentQuizStore = createFeatureSelector<CurrentQuizState>(currentQuizFeatureKey);

export const selectCurrentQuizData = createSelector(
  selectCurrentQuizStore,
  (state: CurrentQuizState) => state.quiz,
);
