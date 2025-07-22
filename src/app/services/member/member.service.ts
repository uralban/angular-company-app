import {Injectable} from '@angular/core';
import {HttpService} from '../http.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, lastValueFrom, Observable} from 'rxjs';
import {CreateRequestInterface} from '../../interfaces/member/create-request.interface';
import {ChangeMemberRole} from '../../interfaces/member/change-member-role';
import {PaginatedListDataInterface} from '../../interfaces/pagination/paginated-list-data.interface';
import {InvitationDto} from '../../interfaces/member/invitation.dto';
import {select, Store} from '@ngrx/store';
import {PaginationRequestInterface} from '../../interfaces/pagination/pagination-request.interface';
import {PaginationDto} from '../../interfaces/pagination/pagination.dto';
import {selectInvitationListData} from '../../state/invitation-list/invitation-list.selector';
import {RequestDto} from '../../interfaces/member/request.dto';
import {selectRequestListData} from '../../state/request-list/request-list.selector';
import {CreateInvitationInterface} from '../../interfaces/member/create-invitation.interface';
import {ResultMessageDto} from '../../interfaces/result-message.dto';
import {UsersLastAttemptListDto} from '../../interfaces/user/users-last-attempt-list.dto';
import {selectUsersLastAttemptListData} from '../../state/users-last-attempt-list';

@Injectable({
  providedIn: 'root'
})
export class MemberService extends HttpService {

  private readonly URL_REQUEST: string;
  private readonly URL_MEMBERS: string;
  private readonly URL_INVITE: string;

  public storedInvitationsListData$: Observable<PaginatedListDataInterface<InvitationDto> | null>;
  public storedRequestsListData$: Observable<PaginatedListDataInterface<RequestDto> | null>;
  public storedUsersLastAttemptListData$: Observable<UsersLastAttemptListDto[] | null>;
  public needReloadInvitationsListData$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public needReloadRequestsListData$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public needReloadUsersLastAttemptListData$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    protected httpClients: HttpClient,
    private readonly store$: Store,
  ) {
    super(httpClients);
    this.URL_REQUEST = environment.apiUrl + '/request';
    this.URL_MEMBERS = environment.apiUrl + '/members';
    this.URL_INVITE = environment.apiUrl + '/invitation';

    this.storedInvitationsListData$ = this.store$.pipe(select(selectInvitationListData));
    this.storedRequestsListData$ = this.store$.pipe(select(selectRequestListData));
    this.storedUsersLastAttemptListData$ = this.store$.pipe(select(selectUsersLastAttemptListData));
  }

  public async createRequest(request: CreateRequestInterface): Promise<ResultMessageDto> {
    return lastValueFrom(super.postForResult(this.URL_REQUEST, ResultMessageDto, {}, request));
  }

  public async createInvite(invite: CreateInvitationInterface): Promise<ResultMessageDto> {
    return lastValueFrom(super.postForResult(this.URL_INVITE, ResultMessageDto, {}, invite));
  }

  public async acceptRequest(requestId: string): Promise<ResultMessageDto> {
    return lastValueFrom(super.patchForResult(this.URL_REQUEST + '/' + requestId, ResultMessageDto));
  }

  public async declineRequest(requestId: string): Promise<ResultMessageDto> {
    return lastValueFrom(super.deleteForResult(this.URL_REQUEST + '/' + requestId, ResultMessageDto));
  }

  public async acceptInvite(inviteId: string): Promise<ResultMessageDto> {
    return lastValueFrom(super.patchForResult(this.URL_INVITE + '/' + inviteId, ResultMessageDto));
  }

  public async declineInvite(inviteId: string): Promise<ResultMessageDto> {
    return lastValueFrom(super.deleteForResult(this.URL_INVITE + '/' + inviteId, ResultMessageDto));
  }

  public async changeMemberRole(memberId: string, changeRole: ChangeMemberRole): Promise<ResultMessageDto> {
    return lastValueFrom(super.patchForResult(this.URL_MEMBERS + '/' + memberId, ResultMessageDto, {}, changeRole));
  }

  public async removeMember(memberId: string): Promise<ResultMessageDto> {
    return lastValueFrom(super.deleteForResult(this.URL_MEMBERS + '/' + memberId, ResultMessageDto));
  }

  public async selfRemoveMember(companyId: string): Promise<ResultMessageDto> {
    return lastValueFrom(super.deleteForResult(this.URL_MEMBERS + '/self/' + companyId, ResultMessageDto));
  }

  public async getAllInvitations(paginationRequest: PaginationRequestInterface): Promise<PaginationDto<InvitationDto>> {
    return lastValueFrom(super.getDataWithPagination(
      this.URL_INVITE,
      (data) => new PaginationDto<InvitationDto>(InvitationDto, data),
      JSON.parse(JSON.stringify(paginationRequest))));
  }

  public async getAllRequests(paginationRequest: PaginationRequestInterface): Promise<PaginationDto<RequestDto>> {
    return lastValueFrom(super.getDataWithPagination(
      this.URL_REQUEST,
      (data) => new PaginationDto<RequestDto>(RequestDto, data),
      JSON.parse(JSON.stringify(paginationRequest))));
  }

}
