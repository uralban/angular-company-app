import { Injectable } from '@angular/core';
import {UserDto} from '../../interfaces/user-dto';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {selectAuthUser} from '../../state/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<UserDto | null>;

  constructor(
    private readonly store$: Store
  ) {
    this.user$ = this.store$.pipe(select(selectAuthUser));
  }
}
