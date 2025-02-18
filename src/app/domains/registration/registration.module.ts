import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistrationComponent} from './registration.component';
import {RegistrationRoutesModule} from './registration.routes';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogClose} from '@angular/material/dialog';
import {NgIconsModule} from '@ng-icons/core';
import {matStar} from '@ng-icons/material-icons/baseline';


@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    RegistrationRoutesModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogClose,
    NgIconsModule.withIcons({matStar}),
  ]
})
export class RegistrationModule {
}
