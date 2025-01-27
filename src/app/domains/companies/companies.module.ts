import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CompaniesComponent} from './companies.component';
import {CompaniesRoutesModule} from './companies.routes';
import {SingleCompanyCartComponent} from './single-company-cart/single-company-cart.component';
import {MatPaginator} from '@angular/material/paginator';



@NgModule({
  declarations: [
    CompaniesComponent,
    SingleCompanyCartComponent
  ],
  imports: [
    CommonModule,
    CompaniesRoutesModule,
    MatPaginator
  ]
})
export class CompaniesModule { }
