import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {combineLatest, filter, map, Observable, take} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectAuthUser, selectIsAuthLoaded} from '../state/core';

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
    return combineLatest([
      this.store$.select(selectAuthUser),
      this.store$.select(selectIsAuthLoaded)
    ]).pipe(
      filter(([user, loaded]) => loaded),
      take(1),
      map(([user]): boolean | UrlTree => {
        const isAuthenticated: boolean = !!user;
        if (isAuthenticated && (url === '/auth' || url === '/registration')) {
          return this.router.createUrlTree(['/']);
        }
        if (!isAuthenticated && url !== '/auth' && url !== '/registration') {
          return this.router.createUrlTree(['/auth']);
        }
        return true;
      })
    );
  }
}
