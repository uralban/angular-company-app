import {inject, Injectable} from '@angular/core';
import {switchMap, catchError, of, from, map, filter, tap} from "rxjs";
import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from "@ngrx/effects";
import {UserDto} from '../../interfaces/user-dto';
import {AuthService} from '../../services/auth/auth.service';
import * as CoreActions from './core.actions';
import {authUserDataClear} from './core.actions';
import {Store} from '@ngrx/store';

@Injectable()
export class CoreEffects {
  private actions$: Actions<any> = inject(Actions);
  private authService: AuthService = inject(AuthService);
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
          this.store$.dispatch(authUserDataClear());
          return false;
        }
        return true;
      }),
      switchMap(() =>
        from(this.authService.getMeData()).pipe(
          map((userMe: UserDto) => CoreActions.authUserDataSuccess({authUserData: userMe})),
          catchError(() => of(CoreActions.authUserDataClear()))
        )
      )
    )
  );
}
