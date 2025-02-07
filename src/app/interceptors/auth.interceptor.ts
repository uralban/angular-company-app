import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '@auth0/auth0-angular';
import {catchError, mergeMap, Observable, take} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.auth.isAuthenticated$.pipe(
      take(1),
      mergeMap((isAuthenticated: boolean): Observable<HttpEvent<any>> => {
        if (!isAuthenticated) {
          const reqClone: HttpRequest<any> = request.clone({
            withCredentials: true
          });
          return next.handle(reqClone);
        }
        return this.auth.getAccessTokenSilently().pipe(
          mergeMap((accessToken: string): Observable<HttpEvent<any>> =>
            this.auth.idTokenClaims$.pipe(
              take(1),
              mergeMap(idTokenClaims => {
                const idToken: string | undefined = idTokenClaims?.__raw;
                const headers: Record<string, string> = {
                  Authorization: `Bearer ${accessToken}`
                };
                if (idToken) {
                  headers['x-id-token'] = idToken;
                }
                return next.handle(request.clone({ setHeaders: headers }));
              })
            )
          ),
          catchError((): Observable<HttpEvent<any>> => next.handle(request))
        );
      })
    );
  }
}
