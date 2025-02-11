import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {HttpService} from '../http.service';
import {lastValueFrom} from 'rxjs';
import {RoleDto} from '../../interfaces/role-dto';
import {CreateUserInterface} from '../../interfaces/create-user.interface';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends HttpService {

  private readonly URL_USER: string;
  private readonly URL_CHECK_EMAIL_EXIST: string;
  private readonly URL_GET_ROLES: string;

  constructor(
    protected httpClients: HttpClient
  ) {
    super(httpClients);
    this.URL_USER = environment.apiUrl + '/user';
    this.URL_CHECK_EMAIL_EXIST = environment.apiUrl + '/user/check-email-exist';
    this.URL_GET_ROLES = environment.apiUrl + '/role';
  }

  public async getEmailExistStatus(email: string): Promise<string> {
    return lastValueFrom(super.getOneForSimpleTypeResults(this.URL_CHECK_EMAIL_EXIST + '/' + email));
  }

  public async getRoles(): Promise<RoleDto[]> {
    return lastValueFrom(super.getAll(this.URL_GET_ROLES, RoleDto, {}));
  }

  public async saveNewUser(newUserData: CreateUserInterface): Promise<void> {
    return lastValueFrom(super.postForResponseStatus(this.URL_USER, newUserData));
  }
}
