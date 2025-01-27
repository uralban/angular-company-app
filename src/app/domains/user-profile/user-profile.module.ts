import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserProfileComponent} from './user-profile.component';
import {UserProfileRoutesModule} from './user-profile.routes';
import {ReactiveFormsModule} from "@angular/forms";
import {NgSelectComponent} from '@ng-select/ng-select';
import {NgIconsModule} from '@ng-icons/core';
import {matClear, matStar} from '@ng-icons/material-icons/baseline';



@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutesModule,
    ReactiveFormsModule,
    NgSelectComponent,
    NgIconsModule.withIcons({matStar, matClear}),
  ]
})
export class UserProfileModule { }
