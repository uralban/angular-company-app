import {Component} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {matCopyright} from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-footer',
  imports: [NgIcon],
  viewProviders: [provideIcons({matCopyright})],
  templateUrl: './footer.component.html'
})
export class FooterComponent {

}
