import {DTO} from './dto.interface';

export class RoleDto implements DTO{

  constructor(
    public id: string,
    public roleName: string,
  ) {}

  populateFromDTO(dto: any): void {
    this.id = dto['id'];
    this.roleName = dto['roleName'];
  }
}
