import { TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { AppComponent } from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {first} from 'rxjs';
import {AuthComponent} from './pages/auth/auth.component';

describe('AppComponent', () => {
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterTestingModule.withRoutes([
          { path: 'auth', component: AuthComponent},
        ])
      ],
      declarations: [AuthComponent]
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Angular' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Angular');
  });

  it('should render main section', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const section = compiled.querySelector('main');
    expect(section).toBeTruthy();
    expect(section?.classList.contains('p-8')).toBeTrue();
  });

  it('should navigate to "auth" when navigating to /auth', async () => {
    router.navigate(['/auth']);
    await router.events.pipe(first()).toPromise();
    expect(location.path()).toBe('/auth');
  });
});
