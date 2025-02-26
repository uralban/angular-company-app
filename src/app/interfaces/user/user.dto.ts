import {DTO} from '../dto.interface';
import {ObjectFiller} from '../../helpers/object-filter';
import {MemberDto} from '../member/member.dto';

export class UserDto implements DTO {

  constructor(
    public id?: string,
    public emailLogin?: string,
    public firstName?: string,
    public lastName?: string,
    public avatarUrl?: string,
    public _userName?: string,
    public companyMemberships	?: MemberDto[],
  ) {}

  populateFromDTO(dto: any): void {
    ObjectFiller.fillPropsFromDTO(this, dto);
  }
}
