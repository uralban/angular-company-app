import {DTO} from '../dto.interface';
import {QuizScoreDto} from './quiz-score.dto';
import {ObjectFiller} from '../../helpers/object-filter';

export class QuizWithScoresDto implements DTO {

  constructor(
    public quizTitle?: string,
    public quizzesScore?: QuizScoreDto[],
  ) {
  }

  populateFromDTO(dto: any): void {
    ObjectFiller.fillPropsFromDTO(this, dto);
  }

}
