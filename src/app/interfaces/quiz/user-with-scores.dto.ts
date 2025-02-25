import {DTO} from '../dto.interface';
import {ObjectFiller} from '../../helpers/object-filter';
import {QuizScoreDto} from './quiz-score.dto';

export class UserWithScoresDto implements DTO {

  constructor(
    public userName?: string,
    public quizzesScore?: QuizScoreDto[],
  ) {
  }

  populateFromDTO(dto: any): void {
    ObjectFiller.fillPropsFromDTO(this, dto);
  }

}
