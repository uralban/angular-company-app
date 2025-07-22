import {PaginatedListDataInterface} from '../../interfaces/pagination/paginated-list-data.interface';
import {QuizDto} from '../../interfaces/quiz/quiz.dto';

export interface QuizListState {
  quizListData: PaginatedListDataInterface<QuizDto> | null;
}

export const initialState: QuizListState = {
  quizListData: null,
};
