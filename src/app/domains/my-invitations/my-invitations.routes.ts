import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MyInvitationsComponent} from './my-invitations.component';

const routes: Routes = [
  {path: '', component: MyInvitationsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyInvitationsRoutesModule {
}
