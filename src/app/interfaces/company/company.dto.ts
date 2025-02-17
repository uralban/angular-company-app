import {DTO} from '../dto.interface';
import {ObjectFiller} from '../../helpers/object-filter';
import {UserDto} from '../user/user.dto';
import {MemberDto} from '../member/member.dto';
import {RequestDto} from '../member/request.dto';
import {InvitationDto} from '../member/invitation.dto';

export class CompanyDto implements DTO{

  constructor(
    public id?: string,
    public companyName?: string,
    public companyDescription?: string,
    public logoUrl?: string,
    public visibility?: string,
    public owner?: UserDto,
    public members?: MemberDto[],
    public requests?: RequestDto[],
    public invitations?: InvitationDto[],
  ) {}

  populateFromDTO(dto: any): void {
    ObjectFiller.fillPropsFromDTO(this, dto);
  }

}
