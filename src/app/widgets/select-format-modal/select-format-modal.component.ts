import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from '@angular/material/dialog';
import {NgIcon} from '@ng-icons/core';
import {NgSelectComponent} from '@ng-select/ng-select';
import {FormatEnum} from '../../consts/format.enum';
import {FormsModule} from '@angular/forms';
import {DialogData} from '../../interfaces/dialog-data.interface';

@Component({
  selector: 'app-select-format-modal',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    NgIcon,
    NgSelectComponent,
    FormsModule
  ],
  templateUrl: './select-format-modal.component.html'
})
export class SelectFormatModalComponent {
  readonly data: DialogData = inject<DialogData>(MAT_DIALOG_DATA);

  public formatList: FormatEnum[] = Object.values(FormatEnum);
  public format: string = FormatEnum.CSV;

  constructor(
    private dialogRef: MatDialogRef<SelectFormatModalComponent>,
  ) {
  }

  public selectFormat(): void {
    this.dialogRef.close(this.format);
  }

}
