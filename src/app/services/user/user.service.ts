import { Injectable } from '@angular/core';
import {BehaviorSubject, lastValueFrom, Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../http.service';
import {PaginationDto} from '../../interfaces/pagination-dto';
import {UserDto} from '../../interfaces/user-dto';
import {PaginationRequestInterface} from '../../interfaces/pagination-request.interface';
import {select, Store} from '@ngrx/store';
import {selectUsersListData} from '../../state/users-list';
import {UsersListDataInterface} from '../../interfaces/users-list-data.interface';
import {ResultMessage} from '../../interfaces/delete-result-message.interface';
import {selectCurrentUserData} from '../../state/current-user';
import {User} from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService {

  private readonly URL_USER: string;

  public singleUserId$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  public storedUsersListData$: Observable<UsersListDataInterface | null>;
  public storedCurrentUserData$: Observable<UserDto | null>;
  public needReloadUsersListData$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

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

  public async deleteUserById(userId: string): Promise<ResultMessage> {
    return lastValueFrom(super.delete(this.URL_USER + '/' + userId, {}));
  }

  public async getUserById(userId: string): Promise<UserDto> {
    return lastValueFrom(super.getOne(this.URL_USER + '/' + userId, UserDto, {}));
  }


  public async updateUser(userId: string, formData: FormData): Promise<UserDto> {
    return lastValueFrom(super.patch(this.URL_USER + '/' + userId, UserDto, {}, formData));
  }

}
