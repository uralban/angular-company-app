import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './core/header/header.component';
import {FooterComponent} from './core/footer/footer.component';
import {Store} from '@ngrx/store';
import {authUserDataSuccess} from './state/core';
import {UserDto} from './interfaces/user-dto';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title: string = 'Angular';

  constructor(private store$: Store) {
    this.store$.dispatch(authUserDataSuccess({authUserData: new UserDto('1', 'test','firstName','lastName')}));
  }
}
