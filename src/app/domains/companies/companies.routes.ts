import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CompaniesComponent} from './companies.component';

const routes: Routes = [
  {path: '', component: CompaniesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutesModule { }
