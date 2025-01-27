import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CompaniesComponent} from './companies.component';
import {CompanyProfileComponent} from './company-profile/company-profile.component';

const routes: Routes = [
  {path: '', component: CompaniesComponent},
  {path: 'company-profile', component: CompanyProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutesModule { }
