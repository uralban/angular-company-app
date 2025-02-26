import {Injectable} from '@angular/core';
import {BehaviorSubject, lastValueFrom, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../http.service';
import {PaginationDto} from '../../interfaces/pagination/pagination.dto';
import {UserDto} from '../../interfaces/user/user.dto';
import {PaginationRequestInterface} from '../../interfaces/pagination/pagination-request.interface';
import {select, Store} from '@ngrx/store';
import {selectUsersListData} from '../../state/users-list';
import {PaginatedListDataInterface} from '../../interfaces/pagination/paginated-list-data.interface';
import {selectCurrentUserData} from '../../state/current-user';
import {ObservableList} from '../../helpers/observable-list';
import {MemberDto} from '../../interfaces/member/member.dto';
import {ResultMessageDto} from '../../interfaces/result-message.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService {

  private readonly URL_USER: string;

  public singleUserId$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  public storedUsersListData$: Observable<PaginatedListDataInterface<UserDto> | null>;
  public storedCurrentUserData$: Observable<UserDto | null>;
  public needReloadUsersListData$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public userList: ObservableList<UserDto> = new ObservableList<UserDto>([]);

  constructor(
    protected httpClients: HttpClient,
    private readonly store$: Store,
  ) {
    super(httpClients);
    this.URL_USER = environment.apiUrl + '/user';

    this.storedUsersListData$ = this.store$.pipe(select(selectUsersListData));
    this.storedCurrentUserData$ = this.store$.pipe(select(selectCurrentUserData));
  }

  public async getAllUser(paginationRequest: PaginationRequestInterface): Promise<PaginationDto<UserDto>> {
    return lastValueFrom(super.getDataWithPagination(
      this.URL_USER,
      (data) => new PaginationDto<UserDto>(UserDto, data),
      JSON.parse(JSON.stringify(paginationRequest))));
  }

  public async deleteUser(): Promise<ResultMessageDto> {
    return lastValueFrom(super.deleteForResult(this.URL_USER, ResultMessageDto));
  }

  public async getUserById(userId: string): Promise<UserDto> {
    return lastValueFrom(super.getOne(this.URL_USER + '/' + userId, UserDto, {}));
  }


  public async updateUser(formData: FormData): Promise<UserDto> {
    return lastValueFrom(super.patchForResult(this.URL_USER, UserDto, {}, formData));
  }

  public async getUserListByName(name: string, members: MemberDto[]): Promise<void> {
    let _userList: UserDto[] = await lastValueFrom(super.getAll(
      this.URL_USER + '/get-users-by-name',
      UserDto,
      {'name': name}
    ));
    this.userList.replaceAll(_userList
      .filter(user => members.findIndex(member => member.user?.id === user.id) === -1)
      .map(user => {
        if (!user.firstName && !user.lastName) {
          user._userName = user.emailLogin || '';
        } else if (user.firstName && user.lastName) {
          user._userName = user.firstName + ' ' + user.lastName;
        } else {
          user._userName = user.firstName ? user.firstName : user.lastName || '';
        }
        return user;
      }));
  }

}
