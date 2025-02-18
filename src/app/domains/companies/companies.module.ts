import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompaniesComponent} from './companies.component';
import {CompaniesRoutesModule} from './companies.routes';
import {SingleCompanyCartComponent} from './single-company-cart/single-company-cart.component';
import {MatPaginator} from '@angular/material/paginator';
import {CompanyProfileComponent} from './company-profile/company-profile.component';
import {NgIconsModule} from '@ng-icons/core';
import {matClear, matEdit, matStar} from '@ng-icons/material-icons/baseline';
import {NgSelectComponent} from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreateCompanyModalComponent} from './create-company-modal/create-company-modal.component';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule} from '@angular/material/dialog';
import {
  ChangeVisibilityForAllCompaniesModalComponent
} from './change-visibility-for-all-companies-modal/change-visibility-for-all-companies-modal.component';
import {MembersComponent} from './company-profile/members/members.component';
import {InvitationsComponent} from './company-profile/invitations/invitations.component';
import {RequestsComponent} from './company-profile/requests/requests.component';
import {MemberCartComponent} from './company-profile/members/member-cart/member-cart.component';
import {RequestCartComponent} from './company-profile/requests/request-cart/request-cart.component';
import {InvitationCartComponent} from './company-profile/invitations/invitation-cart/invitation-cart.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { CreateInvitationModalComponent } from './company-profile/invitations/create-invitation-modal/create-invitation-modal.component';


@NgModule({
  declarations: [
    CompaniesComponent,
    SingleCompanyCartComponent,
    CompanyProfileComponent,
    CreateCompanyModalComponent,
    ChangeVisibilityForAllCompaniesModalComponent,
    MembersComponent,
    InvitationsComponent,
    RequestsComponent,
    MemberCartComponent,
    RequestCartComponent,
    InvitationCartComponent,
    CreateInvitationModalComponent
  ],
  imports: [
    CommonModule,
    CompaniesRoutesModule,
    MatPaginator,
    NgIconsModule.withIcons({matStar, matClear, matEdit}),
    NgSelectComponent,
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule
  ]
})
export class CompaniesModule {
}
