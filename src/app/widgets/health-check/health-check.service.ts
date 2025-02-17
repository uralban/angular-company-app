import {Injectable} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {HttpClient} from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import {HealthCheckDto} from '../../interfaces/health-check.dto';
import {environment} from '../../../environments/environment';

@Injectable()
export class HealthCheckService extends HttpService {

  private readonly URL: string;

  constructor(
    protected httpClients: HttpClient
  ) {
    super(httpClients);
    this.URL = environment.apiUrl;
  }

  public async getHealthCheckData(): Promise<HealthCheckDto<string>> {
    return lastValueFrom(super.getOne(this.URL, HealthCheckDto<string>, {}));
  }
}
