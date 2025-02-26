import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MyRequestsComponent} from './my-requests.component';

const routes: Routes = [
  {path: '', component: MyRequestsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyRequestsRoutesModule {
}
