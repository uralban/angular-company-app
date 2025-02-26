import {Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () => import('./domains/welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./domains/auth/auth.module').then(m => m.AuthModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    loadChildren: () => import('./domains/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'companies',
    loadChildren: () => import('./domains/companies/companies.module').then(m => m.CompaniesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'registration',
    loadChildren: () => import('./domains/registration/registration.module').then(m => m.RegistrationModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./domains/users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'my-invitations',
    loadChildren: () => import('./domains/my-invitations/my-invitations.module').then(m => m.MyInvitationsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'my-requests',
    loadChildren: () => import('./domains/my-requests/my-requests.module').then(m => m.MyRequestsModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadChildren: () => import('./domains/not-found/not-found.module').then(m => m.NotFoundModule)
  },
];
