import { NgModule } from '@angular/core';
import {AuthComponent} from './auth.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', component: AuthComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutesModule { }
