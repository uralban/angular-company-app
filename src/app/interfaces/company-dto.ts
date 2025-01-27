import {DTO} from './dto.interface';

export class CompanyDto implements DTO{

  constructor(
    public id: string,
    public name: string
  ) {}

  populateFromDTO(dto: any): void {
    this.id = dto['id'];
    this.name = dto['emailLogin'];
  }
}
