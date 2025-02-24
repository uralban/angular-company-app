import {AnswerInterface} from './answer.interface';

export interface QuestionInterface {
  _questionId?: number;
  content: string;
  answerOptions: AnswerInterface[];
}
