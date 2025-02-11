import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {PowerSpinnerComponent} from './power-spinner.component';

@NgModule({
  imports:[CommonModule],
  exports: [ PowerSpinnerComponent ],
  declarations: [PowerSpinnerComponent]
})

export class PowerSpinnerModule {}
