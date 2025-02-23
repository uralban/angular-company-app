import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideToastr} from 'ngx-toastr';
import {provideState, provideStore} from '@ngrx/store';
import {metaReducers, reducers} from './state';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {GetDataInterceptor} from './interceptors/get-data.interceptor';
import {ErrorHandlerInterceptor} from './interceptors/error-handler.interceptor';
import {provideAuth0} from '@auth0/auth0-angular';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {environment} from '../environments/environment';
import {provideEffects} from '@ngrx/effects';
import {CoreEffects} from './state/core/core.effects';
import {coreReducerFn} from './state/core/core.reducer';
import {coreDataFeatureKey} from './state/core';
import {usersListDataFeatureKey} from './state/users-list';
import {usersListReducerFn} from './state/users-list/users-list.reducer';
import {currentUserFeatureKey} from './state/current-user';
import {currentUserReducerFn} from './state/current-user/current-user.reducer';
import {rolesListFeatureKey} from './state/roles-list/roles-list.selector';
import {rolesListReducerFn} from './state/roles-list';
import {visibilityReducerFn} from './state/visibility-list';
import {visibilityListFeatureKey} from './state/visibility-list/visibility-list.selector';
import {companyListFeatureKey} from './state/company-list/company-list.selector';
import {companyListReducerFn} from './state/company-list';
import {currentCompanyFeatureKey} from './state/current-company';
import {currentCompanyReducerFn} from './state/current-company/current-company.reducer';
import {invitationListFeatureKey} from './state/invitation-list/invitation-list.selector';
import {invitationListReducerFn} from './state/invitation-list';
import {requestListFeatureKey} from './state/request-list/request-list.selector';
import {requestListReducerFn} from './state/request-list';
import {quizListReducerFn} from './state/quiz-list';
import {quizListFeatureKey} from './state/quiz-list/quiz-list.selector';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideToastr({
        timeOut: 4000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        closeButton: true,
        progressBar: true,
    }),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    provideStore(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    provideState(coreDataFeatureKey, coreReducerFn),
    provideState(usersListDataFeatureKey, usersListReducerFn),
    provideState(currentUserFeatureKey, currentUserReducerFn),
    provideState(rolesListFeatureKey, rolesListReducerFn),
    provideState(visibilityListFeatureKey, visibilityReducerFn),
    provideState(companyListFeatureKey, companyListReducerFn),
    provideState(currentCompanyFeatureKey, currentCompanyReducerFn),
    provideState(invitationListFeatureKey, invitationListReducerFn),
    provideState(requestListFeatureKey, requestListReducerFn),
    provideState(quizListFeatureKey, quizListReducerFn),
    provideEffects(
      CoreEffects
    ),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: GetDataInterceptor, multi: true },
    provideAuth0({
      domain: environment.auth0Domain,
      clientId: environment.clientId,
      authorizationParams: {
        audience: environment.audience,
        redirect_uri: `${window.location.origin}/welcome`,
        response_type: 'token id_token',
        scope: 'openid profile email'
      },
      cacheLocation: 'localstorage',
    }),
]
};
