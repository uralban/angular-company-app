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
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    CompaniesComponent,
    SingleCompanyCartComponent,
    CompanyProfileComponent
  ],
  imports: [
    CommonModule,
    CompaniesRoutesModule,
    MatPaginator,
    NgIconsModule.withIcons({matStar, matClear}),
    NgSelectComponent,
    ReactiveFormsModule
  ]
})
export class CompaniesModule { }
