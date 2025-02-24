import {createAction, props} from '@ngrx/store';
import {QuizDto} from '../../interfaces/quiz/quiz.dto';

export const currentQuizSuccess = createAction(
  "[Current Quiz State] Current quiz data success",
  props<{quiz: QuizDto}>()
);

export const currentQuizClear = createAction(
  "[Current Quiz State] Current quiz data clear",
);
