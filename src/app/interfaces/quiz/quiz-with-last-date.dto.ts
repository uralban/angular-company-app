import {DTO} from '../dto.interface';
import {ObjectFiller} from '../../helpers/object-filter';

export class QuizWithLastDateDto implements DTO {

  constructor(
    public quizId?: string,
    public quizTitle?: string,
    public quizCompanyName?: string,
    public attemptDate?: Date,
  ) {
  }

  populateFromDTO(dto: any): void {
    ObjectFiller.fillPropsFromDTO(this, dto);
  }

}
