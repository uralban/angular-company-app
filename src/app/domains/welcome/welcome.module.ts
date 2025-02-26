import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WelcomeComponent} from './welcome.component';
import {WelcomeRoutesModule} from './welcome.routes';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutesModule,
    ReactiveFormsModule
  ]
})
export class WelcomeModule {
}
