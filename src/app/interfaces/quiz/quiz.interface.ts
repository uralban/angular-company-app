import {QuestionInterface} from './question.interface';

export interface QuizInterface {
  title: string;
  description?: string;
  frequencyInDays: number;
  questions: QuestionInterface[];
}
