import {Component, Input} from '@angular/core';
import {CompanyDto} from '../../../interfaces/company-dto';

@Component({
  selector: 'single-company-cart',
  standalone: false,
  templateUrl: './single-company-cart.component.html'
})
export class SingleCompanyCartComponent {
  @Input() company!: CompanyDto;
}
