import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {HttpService} from '../http.service';
import {lastValueFrom} from 'rxjs';
import {CreateUserInterface} from '../../interfaces/user/create-user.interface';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends HttpService {

  private readonly URL_USER: string;
  private readonly URL_CHECK_EMAIL_EXIST: string;

  constructor(
    protected httpClients: HttpClient
  ) {
    super(httpClients);
    this.URL_USER = environment.apiUrl + '/user';
    this.URL_CHECK_EMAIL_EXIST = environment.apiUrl + '/user/check-email-exist';
  }

  public async getEmailExistStatus(email: string): Promise<string> {
    return lastValueFrom(super.getOneForSimpleTypeResults(this.URL_CHECK_EMAIL_EXIST + '/' + email));
  }

  public async saveNewUser(newUserData: CreateUserInterface): Promise<void> {
    return lastValueFrom(super.postForResponseStatus(this.URL_USER, newUserData));
  }
}
