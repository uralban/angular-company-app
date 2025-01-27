import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./domains/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./domains/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'companies',
    loadChildren: () => import('./domains/companies/companies.module').then(m => m.CompaniesModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./domains/registration/registration.module').then(m => m.RegistrationModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./domains/users/users.module').then(m => m.UsersModule)
  },
  {
    path: '**',
    loadChildren: () => import('./domains/not-found/not-found.module').then(m => m.NotFoundModule)
  },
];
