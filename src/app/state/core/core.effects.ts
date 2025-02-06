import {inject, Injectable} from '@angular/core';
import {switchMap, catchError, of, from, map, filter} from "rxjs";
import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from "@ngrx/effects";
import {UserDto} from '../../interfaces/user-dto';
import {AuthService} from '../../services/auth/auth.service';
import * as CoreActions from './core.actions';

@Injectable()
export class CoreEffects {
  private actions$: Actions<any> = inject(Actions);
  private authService: AuthService = inject(AuthService);

  public initLoadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      filter((): boolean => {
        const lastLoginTimestamp: string | null = localStorage.getItem('login');
        if (!lastLoginTimestamp) return false;
        return Number(lastLoginTimestamp) + 604800000 > new Date().getTime();
      }),
      switchMap(() =>
        from(this.authService.getMeData()).pipe(
          map((userMe: UserDto) => CoreActions.authUserDataSuccess({authUserData: userMe}),
          catchError(() => of(CoreActions.authUserDataClear()))
          )
        )
      )
    )
  );
}
