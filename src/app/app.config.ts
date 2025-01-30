import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideToastr} from 'ngx-toastr';
import { provideStore } from '@ngrx/store';
import {metaReducers, reducers} from './state';
import {provideHttpClient} from '@angular/common/http';

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
    provideStore(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    provideHttpClient()
]
};
