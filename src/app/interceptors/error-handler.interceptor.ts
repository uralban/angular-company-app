import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {catchError, Observable, throwError} from 'rxjs';
import {ErrorDTO} from '../interfaces/error-dto';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private readonly toastrService: ToastrService) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((errorResp: HttpErrorResponse) => {
        if (
          errorResp &&
          errorResp.error
        ) {
          this.showErrorToast(errorResp.error);
        }
        return throwError(() => errorResp);
      })
    );
  }

  private showErrorToast(errorDTO: ErrorDTO): void {
    if (errorDTO.result) {
      this.toastrService.error(errorDTO.result);
    } else {
      this.toastrService.error('Server error');
    }
  }
}
