import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import {AuthRoutesModule} from './auth.routes';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AuthComponent
  ],
    imports: [
        CommonModule,
        AuthRoutesModule,
        ReactiveFormsModule
    ]
})
export class AuthModule { }
