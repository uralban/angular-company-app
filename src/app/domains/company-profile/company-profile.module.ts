import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CompanyProfileComponent} from './company-profile.component';
import {CompanyProfileRoutesModule} from './company-profile.routes';
import {MatPaginator} from "@angular/material/paginator";
import {NgIconsModule} from '@ng-icons/core';
import {NgSelectComponent} from '@ng-select/ng-select';
import {ReactiveFormsModule} from '@angular/forms';
import {matClear, matStar} from '@ng-icons/material-icons/baseline';



@NgModule({
  declarations: [
    CompanyProfileComponent,
  ],
  imports: [
    CommonModule,
    CompanyProfileRoutesModule,
    MatPaginator,
    NgIconsModule.withIcons({matStar, matClear}),
    NgSelectComponent,
    ReactiveFormsModule
  ]
})
export class CompanyProfileModule { }
