import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutComponent} from './about.component';
import {AboutRoutesModule} from './about.routes';
import {NgIconsModule} from '@ng-icons/core';
import {matEmail, matLocationOn, matPhone} from '@ng-icons/material-icons/baseline';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    AboutRoutesModule,
    NgIconsModule.withIcons({matEmail, matPhone, matLocationOn}),
    ReactiveFormsModule,
  ]
})
export class AboutModule {
}
