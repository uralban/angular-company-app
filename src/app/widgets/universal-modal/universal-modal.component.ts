import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {DialogData} from '../../interfaces/dialog-data.interface';

@Component({
  selector: 'universal-modal',
  templateUrl: 'universal-modal.component.html',
  imports: [MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniversalModalComponent {
  readonly data: DialogData = inject<DialogData>(MAT_DIALOG_DATA);

}
