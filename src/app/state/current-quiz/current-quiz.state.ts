import {QuizDto} from '../../interfaces/quiz/quiz.dto';

export interface CurrentQuizState {
  quiz: QuizDto | null;
}

export const initialState: CurrentQuizState = {
  quiz: null,
};
