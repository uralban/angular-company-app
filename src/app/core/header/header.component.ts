import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {UserDto} from '../../interfaces/user-dto';
import {Subject, takeUntil} from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';
import {HealthCheckComponent} from '../../widgets/health-check/health-check.component';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    HealthCheckComponent
  ],
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {

  public userName: string | undefined;

  private readonly ngDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
  ) {}


  public ngOnInit(): void {
    this.authService.user$.pipe(takeUntil(this.ngDestroy$)).subscribe((user: UserDto | null) => {
      if (user) {
        this.userName = user.firstName + ' ' + user.lastName;
      }
    });
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

}
