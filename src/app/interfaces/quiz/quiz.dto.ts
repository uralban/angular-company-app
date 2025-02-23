import {DTO} from '../dto.interface';
import {ObjectFiller} from '../../helpers/object-filter';
import {QuestionDto} from './question.dto';
import {CompanyDto} from '../company/company.dto';

export class QuizDto implements DTO {

  constructor(
    public id?: string,
    public title?: string,
    public description?: string,
    public frequencyInDays?: number,
    public questions?: QuestionDto[],
    public company?: CompanyDto,
  ) {
  }

  populateFromDTO(dto: any): void {
    ObjectFiller.fillPropsFromDTO(this, dto);
  }

}
