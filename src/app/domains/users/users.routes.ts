import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {UsersComponent} from './users.component';
import {UserProfileComponent} from './user-profile/user-profile.component';

const routes: Routes = [
  {path: '', component: UsersComponent},
  {path: 'user-profile', component: UserProfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutesModule {
}
