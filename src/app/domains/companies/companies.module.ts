import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CompaniesComponent} from './companies.component';
import {CompaniesRoutesModule} from './companies.routes';
import {SingleCompanyCartComponent} from './single-company-cart/single-company-cart.component';
import {MatPaginator} from '@angular/material/paginator';
import {CompanyProfileComponent} from './company-profile/company-profile.component';
import {NgIconsModule} from '@ng-icons/core';
import {matClear, matStar} from '@ng-icons/material-icons/baseline';
import {NgSelectComponent} from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateCompanyModalComponent } from './create-company-modal/create-company-modal.component';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule} from '@angular/material/dialog';
import { ChangeVisibilityForAllCompaniesModalComponent } from './change-visibility-for-all-companies-modal/change-visibility-for-all-companies-modal.component';



@NgModule({
  declarations: [
    CompaniesComponent,
    SingleCompanyCartComponent,
    CompanyProfileComponent,
    CreateCompanyModalComponent,
    ChangeVisibilityForAllCompaniesModalComponent
  ],
  imports: [
    CommonModule,
    CompaniesRoutesModule,
    MatPaginator,
    NgIconsModule.withIcons({matStar, matClear}),
    NgSelectComponent,
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogModule,
    FormsModule
  ]
})
export class CompaniesModule { }
