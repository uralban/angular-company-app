import {DTO} from '../dto.interface';
import {ObjectFiller} from '../../helpers/object-filter';

export class AnswerDto implements DTO {

  constructor(
    public id?: string,
    public content?: string,
    public isCorrect?: boolean
  ) {
  }

  populateFromDTO(dto: any): void {
    ObjectFiller.fillPropsFromDTO(this, dto);
  }

}
