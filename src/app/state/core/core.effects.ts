import {Injectable} from '@angular/core';
import { switchMap, throwError, catchError, of } from "rxjs";
import * as  GlobalLoaderActions from "./core.actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {UserDto} from '../../interfaces/user-dto';

@Injectable()
export class CoreEffects {
  constructor(
    private actions$: Actions<any>
  ) {}

  public authUserDataClear$ = createEffect(() => this.actions$.pipe(
    ofType(GlobalLoaderActions.authUserDataClear.type),
    switchMap(() => {
      return of(null)
    }),
    catchError(error => {
      return throwError(error);
    })
  ), {dispatch: false});

  public authUserDataSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(GlobalLoaderActions.authUserDataSuccess.type),
    switchMap((action:{authUserData: UserDto}) => {
      return of(action)
    }),
    catchError(error => {
      return throwError(error);
    })
  ), {dispatch: false});

}
