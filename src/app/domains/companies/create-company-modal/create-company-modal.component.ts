import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {DialogData} from '../../../interfaces/dialog-data.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CompanyService} from '../../../services/company/company.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PowerSpinnerService} from '../../../widgets/power-spinner/power-spinner.service';
import {Store} from '@ngrx/store';
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from 'rxjs';
import {visibilityListSuccess} from '../../../state/visibility-list';
import {ToastrService} from 'ngx-toastr';
import {Company} from '../../../interfaces/company/company.interface';

@Component({
  selector: 'app-create-company-modal',
  standalone: false,
  templateUrl: './create-company-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCompanyModalComponent implements OnInit, OnDestroy {
  readonly data: DialogData = inject<DialogData>(MAT_DIALOG_DATA);

  public createCompanyForm: FormGroup;
  public visibilityList: string[] = [];
  public selectedFile: File | null = null;
  public logoPreviewUrl: string | ArrayBuffer | null = null;
  private readonly ngDestroy$: Subject<void> = new Subject<void>();
  public companyNameInputInvalidFlag: boolean = false;
  private inputCompanyNameSubject: Subject<string> = new Subject<string>();

  constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private spinner: PowerSpinnerService,
    private store$: Store,
    private readonly toastrService: ToastrService,
    private dialogRef: MatDialogRef<CreateCompanyModalComponent>,
    private cdr: ChangeDetectorRef
  ) {
    this.createCompanyForm = this.createCompanyFormInit();
  }

  public ngOnInit(): void {
    this.inputEmailSubjectSubscribe();
    this.getVisibilityListStoreSubscribe();
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
    this.companyService.singleCompanyId.next(undefined);
  }

  public createCompanyFormInit(): FormGroup {
    return this.formBuilder.group({
      companyName: [undefined, Validators.compose([
        Validators.required,
        Validators.pattern(/^([A-Za-z0-9\s])+$/)
      ])],
      companyDescription: [undefined, Validators.pattern(/^([A-Za-z0-9\s])+$/)],
      visibility: [undefined, Validators.required],
    });
  }

  private getVisibilityListStoreSubscribe(): void {
    this.companyService.storedVisibilityListData$.pipe(takeUntil(this.ngDestroy$)).subscribe(visibilityList => {
      if (visibilityList) {
        this.visibilityList = visibilityList;
      } else {
        this.getVisibilityList();
      }
    });
  }

  private getVisibilityList(): void {
    this.spinner.show();
    this.companyService.getVisibilityList().then((visibilityList: string[]): void => {
      this.store$.dispatch(visibilityListSuccess({visibilityList: visibilityList}));
    }).finally(() => this.spinner.hide());
  }

  public saveCompany(): void {
    const newCompanyData: Company = {
      ...this.createCompanyForm.value
    };
    if (!newCompanyData.companyDescription) delete newCompanyData.companyDescription;
    const formData = new FormData();
    formData.append('companyData', JSON.stringify(newCompanyData));
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }
    this.spinner.show();
    this.companyService.createCompany(formData).then(() => {
      this.companyService.needReloadCompanyListData$.next(true);
      this.dialogRef.close(true);
    }).finally(() => this.spinner.hide());
  }

  public onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreviewUrl = reader.result;
        this.cdr.detectChanges();
      }
      reader.readAsDataURL(file);
    } else {
      this.toastrService.error('Only JPG and PNG files are allowed.');
    }
  }

  public deleteLogo(): void {
    this.logoPreviewUrl = null;
    this.selectedFile = null;
  }

  private inputEmailSubjectSubscribe(): void {
    this.inputCompanyNameSubject.pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      takeUntil(this.ngDestroy$)
    ).subscribe(value => {
      if (!value.length) {
        this.companyNameInputInvalidFlag = false;
        this.cdr.detectChanges();
        return;
      }
      this.companyNameInputInvalidFlag = !!this.createCompanyForm.get('companyName')?.invalid;
      this.cdr.detectChanges();
    });
  }

  public onInputChangeCompanyName(event: Event): void {
    this.inputCompanyNameSubject.next((event.target as HTMLInputElement).value);
  }

}
