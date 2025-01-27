import {Component, Input} from '@angular/core';
import {UserDto} from '../../../interfaces/user-dto';

@Component({
  selector: 'single-user-cart',
  standalone: false,
  templateUrl: './single-user-cart.component.html'
})
export class SingleUserCartComponent {
  @Input() user!: UserDto;

}
