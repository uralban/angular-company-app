import {DTO} from './dto.interface';

export class UserDto implements DTO{

  constructor(
    public id: string,
    public emailLogin: string,
    public firstName?: string,
    public lastName?: string,
  ) {}

  populateFromDTO(dto: any): void {
    this.id = dto['id'];
    this.emailLogin = dto['emailLogin'];
    this.firstName = dto['firstName'];
    this.lastName = dto['lastName'];
  }
}
