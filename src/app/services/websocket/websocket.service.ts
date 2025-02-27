import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import io from 'socket.io-client';
import {NotificationDto} from '../../interfaces/notifications/notification.dto';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: any;

  constructor() {
  }

  public connect(userId: string): void {
    if (!this.socket || !this.socket.connected) {
      this.socket = io(environment.socketUrl, {
        query: {userId},
        transports: ['websocket'],
      });

      this.socket.on('connect', () => {
        this.subscribeToNotifications(userId);
      });

      this.socket.on('disconnect', () => {
      });
    }
  }

  public subscribeToNotifications(userId: string): void {
    if (this.socket) {
      this.socket.emit('subscribeNotifications', userId);
    }
  }

  public listenForNotifications(): Observable<NotificationDto> {
    return new Observable((observer) => {
      if (this.socket) {
        this.socket.on('notification', (notification: NotificationDto) => {
          observer.next(notification);
        });
      }
    });
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
