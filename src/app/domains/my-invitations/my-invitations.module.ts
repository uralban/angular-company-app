import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyInvitationsComponent} from './my-invitations.component';
import {MyInvitationsRoutesModule} from './my-invitations.routes';
import {MyInvitationCartComponent} from './my-invitation-cart/my-invitation-cart.component';
import {MatPaginator} from '@angular/material/paginator';
import {NgIconsModule} from '@ng-icons/core';
import {matCheck, matClear} from '@ng-icons/material-icons/baseline';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    MyInvitationsComponent,
    MyInvitationCartComponent
  ],
  imports: [
    CommonModule,
    MyInvitationsRoutesModule,
    MatPaginator,
    NgIconsModule.withIcons({matCheck, matClear}),
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogModule,
  ]
})
export class MyInvitationsModule {
}
