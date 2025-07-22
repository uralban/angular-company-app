import {createAction, props} from '@ngrx/store';
import {PaginatedListDataInterface} from '../../interfaces/pagination/paginated-list-data.interface';
import {QuizDto} from '../../interfaces/quiz/quiz.dto';

export const quizListDataSuccess = createAction(
  "[Quiz List State] Quiz list data success",
  props<{ quizListData: PaginatedListDataInterface<QuizDto> }>()
);

export const quizListDataClear = createAction(
  "[Quiz List State] Quiz list data clear",
);
