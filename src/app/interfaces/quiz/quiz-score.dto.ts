import {DTO} from '../dto.interface';
import {ObjectFiller} from '../../helpers/object-filter';

export class QuizScoreDto implements DTO {

  constructor(
    public attemptDate?: Date,
    public score?: string,
  ) {
  }

  populateFromDTO(dto: any): void {
    ObjectFiller.fillPropsFromDTO(this, dto);
  }

}
