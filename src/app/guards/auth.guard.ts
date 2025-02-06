import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable, of, take} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectAuthUser} from '../state/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private store$: Store,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    return this.store$.select(selectAuthUser).pipe(
      take(1),
      map((user): boolean | UrlTree => {
        const isAuthenticated: boolean = !!user;
        if (isAuthenticated && (url === '/auth' || url === '/registration')) {
          return false;
        }
        if (!isAuthenticated && (url === '/auth' || url === '/registration')) {
          return true;
        }
        return isAuthenticated;
      })
    );
  }
}
