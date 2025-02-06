import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {PowerSpinnerService} from './power-spinner.service';
import {IPowerSpinnerEvent} from './power-spinner-event.interface.';

@Component({
  selector: 'power-spinner',
  standalone: false,
  templateUrl: './power-spinner.component.html',
  styleUrls: ['./power-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PowerSpinnerComponent implements OnInit, OnDestroy {
  constructor(
    private spinnerSrv:PowerSpinnerService,
    private cdr:ChangeDetectorRef,
  ) { }

  @Input() fullScreen: boolean = false;
  @Input() name: string | null = null;

  public isOpened: boolean = false;
  public sub: Subscription | undefined;

  public ngOnInit(): void {
    this.sub = this.spinnerSrv.stateChanged.subscribe(this.handleService.bind(this));
    this.cdr.detectChanges();
  }

  public handleService(event: IPowerSpinnerEvent): void {
    if (event.name && this.name && (event.name == this.name)) {
      this.isOpened = event.state;
    } else if (!event.name && !this.name) {
      this.isOpened = event.state;
    }
    this.cdr.detectChanges();
  }

  public ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

}
