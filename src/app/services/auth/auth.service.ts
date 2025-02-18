import { Injectable } from '@angular/core';
import {UserDto} from '../../interfaces/user/user.dto';
import {lastValueFrom, Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {selectAuthUser} from '../../state/core';
import {HttpService} from '../http.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoginLogoutData} from '../../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService {

  private readonly URL_LOGIN: string;
  private readonly URL_LOGOUT: string;
  private readonly URL_ME: string;

  public user$: Observable<UserDto | null>;
  public needLogoutUser$: Subject<boolean> = new Subject();

  constructor(
    private readonly store$: Store,
    protected httpClients: HttpClient
  ) {
    super(httpClients);
    this.URL_LOGIN = environment.apiUrl + '/auth/login';
    this.URL_LOGOUT = environment.apiUrl + '/auth/logout';
    this.URL_ME = environment.apiUrl + '/me';

    this.user$ = this.store$.pipe(select(selectAuthUser));
  }

  public async loginByEmail(loginData: LoginLogoutData): Promise<void> {
    return lastValueFrom(super.postForResponseStatus(this.URL_LOGIN, loginData));
  }

  public async logout(): Promise<void> {
    return lastValueFrom(super.postForResponseStatus(this.URL_LOGOUT, {}));
  }

  public async getMeData(): Promise<UserDto> {
    return lastValueFrom(super.getOne(this.URL_ME, UserDto));
  }
}
