import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CompanyProfileComponent} from './company-profile.component';

const routes: Routes = [
  {path: '', component: CompanyProfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyProfileRoutesModule { }
