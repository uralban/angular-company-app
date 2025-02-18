import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './users.component';
import {UsersRoutesModule} from './users.routes';
import {MatPaginatorModule} from '@angular/material/paginator';
import {SingleUserCartComponent} from "./single-user-cart/single-user-cart.component";
import {UserProfileComponent} from './user-profile/user-profile.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgIconsModule} from '@ng-icons/core';
import {matClear, matStar} from '@ng-icons/material-icons/baseline';


@NgModule({
  declarations: [
    UsersComponent,
    SingleUserCartComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    UsersRoutesModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({matStar, matClear}),
  ]
})
export class UsersModule {
}
