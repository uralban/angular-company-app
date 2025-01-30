import {Injectable} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {HttpClient} from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import {HealthCheckDto} from '../../interfaces/health-check-dto';

@Injectable()
export class HealthCheckService extends HttpService {

  private readonly URL: string = 'http://localhost:8080/';

  constructor(
    protected httpClients: HttpClient
  ) {
    super(httpClients);
  }

  public async getHealthCheckData(): Promise<HealthCheckDto | undefined> {
    return lastValueFrom(super.getOne(this.URL, HealthCheckDto, {}));
  }
}
