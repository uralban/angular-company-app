import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class GetDataInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url === environment.apiUrl) {
      return next.handle(request);
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (localStorage.getItem('login')) localStorage.setItem('login', new Date().getTime().toString());
        if (event instanceof HttpResponse) {
          return event.clone({body: event.body.detail});
        }
        return event;
      })
    );
  }
}
