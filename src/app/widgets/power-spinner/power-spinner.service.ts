import {EventEmitter, Injectable} from '@angular/core';
import {IPowerSpinnerEvent} from './power-spinner-event.interface.';

@Injectable({providedIn: "root"})
export class PowerSpinnerService {

  public stateChanged: EventEmitter<IPowerSpinnerEvent> = new EventEmitter<IPowerSpinnerEvent>();


  public show(name: string | null = null) {
    this.stateChanged.emit({state: true, name: name});
  }

  public hide(name: string | null = null) {
    this.stateChanged.emit({state: false, name: name});
  }

}
