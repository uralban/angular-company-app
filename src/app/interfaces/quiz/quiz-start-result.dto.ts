import {DTO} from '../dto.interface';
import {ObjectFiller} from '../../helpers/object-filter';
import {QuizDto} from './quiz.dto';

export class QuizStartResultDto implements DTO {

  constructor(
    public message?: string,
    public quiz?: QuizDto,
  ) {
  }

  populateFromDTO(dto: any): void {
    ObjectFiller.fillPropsFromDTO(this, dto);
  }

}
