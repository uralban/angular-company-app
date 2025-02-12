import { Injectable } from '@angular/core';
import {HttpService} from '../http.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {RoleDto} from '../../interfaces/role-dto';
import {lastValueFrom, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {selectRolesListData} from '../../state/roles-list/roles-list.selector';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends HttpService  {

  private readonly URL_GET_ROLES: string;

  public storedRolesListData$: Observable<RoleDto[] | null>;

  constructor(
    protected httpClients: HttpClient,
    private readonly store$: Store,
  ) {
    super(httpClients);
    this.URL_GET_ROLES = environment.apiUrl + '/role';
    this.storedRolesListData$ = this.store$.pipe(select(selectRolesListData));
  }

  public async getRoles(): Promise<RoleDto[]> {
    return lastValueFrom(super.getAll(this.URL_GET_ROLES, RoleDto, {}));
  }
}
