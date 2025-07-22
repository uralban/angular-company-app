import {Injectable} from '@angular/core';
import {HttpService} from '../http.service';
import {HttpClient} from '@angular/common/http';
import {select, Store} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import {lastValueFrom, Observable} from 'rxjs';
import {NotificationDto} from '../../interfaces/notifications/notification.dto';
import {selectNotifications} from '../../state/notifications/notifications.selector';
import {ResultMessageDto} from '../../interfaces/result-message.dto';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends HttpService {

  private readonly URL_NOTIFICATION: string;

  public notifications$: Observable<NotificationDto[] | null>;

  constructor(
    protected httpClients: HttpClient,
    private readonly store$: Store,
  ) {
    super(httpClients);
    this.URL_NOTIFICATION = environment.apiUrl + '/notifications';

    this.notifications$ = this.store$.pipe(select(selectNotifications));
  }

  public async getAllNotifications(): Promise<NotificationDto[]> {
    return lastValueFrom(super.getAll(this.URL_NOTIFICATION, NotificationDto));
  }

  public async markNotificationIsRead(notificationId: string): Promise<ResultMessageDto> {
    return lastValueFrom(super.patchForResult(this.URL_NOTIFICATION + '/read/' + notificationId, ResultMessageDto));
  }
}
