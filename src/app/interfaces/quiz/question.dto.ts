import {DTO} from '../dto.interface';
import {ObjectFiller} from '../../helpers/object-filter';
import {AnswerDto} from './answer.dto';

export class QuestionDto implements DTO {

  constructor(
    public id?: string,
    public content?: string,
    public answerOptions?: AnswerDto[]
  ) {
  }

  populateFromDTO(dto: any): void {
    ObjectFiller.fillPropsFromDTO(this, dto);
  }

}
