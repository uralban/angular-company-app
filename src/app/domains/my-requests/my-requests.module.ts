import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyRequestsComponent} from './my-requests.component';
import {MyRequestsRoutesModule} from './my-requests.routes';
import {MyRequestCartComponent} from './my-request-cart/my-request-cart.component';
import {MatPaginator} from '@angular/material/paginator';
import {NgIconsModule} from '@ng-icons/core';
import {matClear} from '@ng-icons/material-icons/baseline';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    MyRequestsComponent,
    MyRequestCartComponent
  ],
  imports: [
    CommonModule,
    MyRequestsRoutesModule,
    MatPaginator,
    NgIconsModule.withIcons({matClear}),
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogModule,
  ]
})
export class MyRequestsModule {
}
