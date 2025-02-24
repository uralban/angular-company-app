import {DTO} from '../dto.interface';
import {ObjectFiller} from '../../helpers/object-filter';
import {QuestionAttemptAnswerDto} from './question-attempt-answer.dto';

export class QuizAttemptDto implements DTO {

  constructor(
    public quizId?: string,
    public questions?: QuestionAttemptAnswerDto[],
  ) {
  }

  populateFromDTO(dto: any): void {
    ObjectFiller.fillPropsFromDTO(this, dto);
  }

}
