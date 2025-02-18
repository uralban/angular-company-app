import {Component, Input} from '@angular/core';
import {RequestDto} from '../../../../interfaces/member/request.dto';

@Component({
  selector: 'requests',
  standalone: false,
  templateUrl: './requests.component.html'
})
export class RequestsComponent {
  @Input() requests!: RequestDto[];

}
