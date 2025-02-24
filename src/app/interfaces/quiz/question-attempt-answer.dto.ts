import {DTO} from '../dto.interface';
import {ObjectFiller} from '../../helpers/object-filter';

export class QuestionAttemptAnswerDto implements DTO {

  constructor(
    public questionId?: string,
    public answersIdList?: string[],
  ) {
  }

  populateFromDTO(dto: any): void {
    ObjectFiller.fillPropsFromDTO(this, dto);
  }

}
