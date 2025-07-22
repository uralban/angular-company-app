import {inject, Injectable} from '@angular/core';
import {catchError, filter, forkJoin, from, mergeMap, of, switchMap} from "rxjs";
import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from "@ngrx/effects";
import {UserDto} from '../../interfaces/user/user.dto';
import {AuthService} from '../../services/auth/auth.service';
import * as CoreActions from './core.actions';
import * as NotificationsActions from '../notifications/notifications.actions';
import {authUserDataClear} from './core.actions';
import {Store} from '@ngrx/store';
import {NotificationDto} from '../../interfaces/notifications/notification.dto';
import {NotificationService} from '../../services/notification/notification.service';

@Injectable()
export class CoreEffects {
  private actions$: Actions<any> = inject(Actions);
  private authService: AuthService = inject(AuthService);
  private notificationService: NotificationService = inject(NotificationService);
  private store$: Store = inject(Store);

  public initLoadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      filter((): boolean => {
        const lastLoginTimestamp: string | null = localStorage.getItem('login');
        if (!lastLoginTimestamp) {
          this.store$.dispatch(authUserDataClear());
          return false;
        }
        if (!(Number(lastLoginTimestamp) + 604800000 > new Date().getTime())) {
          localStorage.clear();
          this.store$.dispatch(authUserDataClear());
          return false;
        }
        return true;
      }),
      switchMap(() =>
        forkJoin([
          this.authService.getMeData(),
          this.notificationService.getAllNotifications()
        ]).pipe(
          mergeMap(([userMe, notifications]: [UserDto, NotificationDto[]]) =>
            from([
              CoreActions.authUserDataSuccess({ authUserData: userMe }),
              NotificationsActions.notificationsSuccess({ notifications })
            ])
          ),
          catchError(() => of(CoreActions.authUserDataClear()))
        )
      )
    )
  );
}
