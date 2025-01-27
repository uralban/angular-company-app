import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsersComponent} from './users.component';
import {UsersRoutesModule} from './users.routes';
import {MatPaginatorModule} from '@angular/material/paginator';
import {SingleUserCartComponent} from "./single-user-cart/single-user-cart.component";



@NgModule({
  declarations: [
    UsersComponent,
    SingleUserCartComponent
  ],
  imports: [
    CommonModule,
    UsersRoutesModule,
    MatPaginatorModule
  ]
})
export class UsersModule { }
