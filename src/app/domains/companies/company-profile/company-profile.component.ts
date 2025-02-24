import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter, Subject, take, takeUntil} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompanyDto} from '../../../interfaces/company/company.dto';
import {ToastrService} from 'ngx-toastr';
import {CompanyService} from '../../../services/company/company.service';
import {Router} from '@angular/router';
import {PowerSpinnerService} from '../../../widgets/power-spinner/power-spinner.service';
import {Store} from '@ngrx/store';
import {AuthService} from '../../../services/auth/auth.service';
import {UserDto} from '../../../interfaces/user/user.dto';
import {visibilityListSuccess} from '../../../state/visibility-list';
import {Company} from '../../../interfaces/company/company.interface';
import {currentCompanySuccess} from '../../../state/current-company';
import {QuizService} from '../../../services/quiz/quiz.service';

@Component({
  selector: 'app-company-profile',
  standalone: false,
  templateUrl: './company-profile.component.html'
})
export class CompanyProfileComponent implements OnInit, OnDestroy {

  private readonly ngDestroy$: Subject<void> = new Subject<void>();
  public isEditing: boolean = false;
  public company: CompanyDto | null = null;
  protected storedUser: UserDto | null = null;
  public editCompanyForm: FormGroup;
  public visibilityList: string[] = [];
  public selectedFile: File | null = null;
  public logoPreviewUrl: string | ArrayBuffer | null = null;
  public editDisabled: boolean = true;
  public isAdmin: boolean = false;
  public isMember: boolean = false;
  public currentCompanyId: string = '';

  constructor(
    private router: Router,
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private spinner: PowerSpinnerService,
    private readonly toastrService: ToastrService,
    private store$: Store,
    private authService: AuthService,
    private quizService: QuizService,
  ) {
    this.editCompanyForm = this.editCompanyFormInit();
  }

  public ngOnInit(): void {
    this.userSubscribe();
    this.getVisibilityListStoreSubscribe();
    this.checkCompanyIdAndUpdateCurrentCompanyStore();
    this.needReloadCurrentCompanySubscribe();
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
    this.companyService.singleCompanyId.next(undefined);
  }

  public editCompanyFormInit(): FormGroup {
    return this.formBuilder.group({
      companyName: [undefined, Validators.compose([
        Validators.required,
        Validators.pattern(/^([A-Za-z0-9\s])+$/)
      ])],
      companyDescription: [undefined, Validators.pattern(/^([A-Za-z0-9\s])+$/)],
      visibility: [undefined, Validators.required],
    })
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

  private userSubscribe(): void {
    this.authService.user$.pipe(takeUntil(this.ngDestroy$)).subscribe((user: UserDto | null) => {
      this.storedUser = user;
    });
  }

  private getVisibilityList(): void {
    this.spinner.show();
    this.companyService.getVisibilityList().then((visibilityList: string[]): void => {
      this.store$.dispatch(visibilityListSuccess({visibilityList: visibilityList}));
    }).finally(() => this.spinner.hide());
  }

  private setDefaultValues(): void {
    this.editCompanyForm.get('companyName')?.setValue(this.company?.companyName);
    if (this.company?.companyDescription) this.editCompanyForm.get('companyDescription')?.setValue(this.company.companyDescription);
    if (this.company?.logoUrl) this.logoPreviewUrl = this.company.logoUrl;
    this.editCompanyForm.get('visibility')?.setValue(this.visibilityList.find(visibility => visibility === this.company?.visibility));
    this.editDisabled = this.company?.owner?.emailLogin !== this.storedUser?.emailLogin;
  }

  private checkCompanyIdAndUpdateCurrentCompanyStore(): void {
    this.companyService.singleCompanyId.pipe(takeUntil(this.ngDestroy$)).subscribe(id => {
      if (!id) {
        this.router.navigate(['/companies']);
      } else {
        this.currentCompanyId = id;
        this.companyService.storedVisibilityListData$.pipe(
          filter(visibilityList => !!(visibilityList && visibilityList.length > 0)),
          take(1)
        ).subscribe(visibilityList => {
          this.subscribeToCompanyUpdates(id);
        });
      }
    });
  }

  private subscribeToCompanyUpdates(id: string): void {
    this.companyService.storedCurrentCompanyData$.pipe(
      takeUntil(this.ngDestroy$)
    ).subscribe(company => {
      if (company && company.id === id) {
        this.company = company;
        const currentUserRole: string | undefined = this.company.members?.find(member => member?.user?.id === this.storedUser?.id)?.role?.roleName;
        if (currentUserRole) {
          this.isAdmin = currentUserRole === 'owner' || currentUserRole === 'admin';
          this.isMember = true;
        }
        this.setDefaultValues();
      } else {
        this.getCompanyById(id);
      }
    });
  }

  private getCompanyById(id: string): void {
    this.spinner.show();
    this.companyService.getCompanyById(id).then(company => {
      this.store$.dispatch(currentCompanySuccess({company: company}));
      this.companyService.needReloadCurrentCompanyData$.next(false);
      this.quizService.needReloadQuizListData$.next(true);
    }).finally(() => this.spinner.hide());
  }

  public toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  public cancelEdit(): void {
    this.isEditing = false;
    this.setDefaultValues();
  }

  private needReloadCurrentCompanySubscribe(): void {
    this.companyService.needReloadCurrentCompanyData$.pipe(takeUntil(this.ngDestroy$)).subscribe((flag: boolean): void => {
      if (flag) {
        this.quizService.needReloadQuizListData$.next(true);
        this.getCompanyById(this.currentCompanyId);
      }
    });
  }

  public onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => (this.logoPreviewUrl = reader.result);
      reader.readAsDataURL(file);
    } else {
      this.toastrService.error('Only JPG and PNG files are allowed.');
    }
  }

  public saveChanges(): void {
    const newCompanyData: Company = {};
    const formData = new FormData();
    if (this.editCompanyForm.get('companyName')?.value !== this.company?.companyName) newCompanyData.companyName = this.editCompanyForm.get('companyName')?.value;
    if (this.editCompanyForm.get('companyDescription')?.value !== this.company?.companyDescription) newCompanyData.companyDescription = this.editCompanyForm.get('companyDescription')?.value || '';
    if (this.editCompanyForm.get('visibility')?.value !== this.company?.visibility) newCompanyData.visibility = this.editCompanyForm.get('visibility')?.value;
    if (!this.logoPreviewUrl) newCompanyData.logoUrl = '';
    formData.append('companyData', JSON.stringify(newCompanyData));
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.spinner.show();
    this.companyService.updateCompanyById(this.company?.id as string, formData).then(company => {
      this.companyService.needReloadCompanyListData$.next(true);
      this.store$.dispatch(currentCompanySuccess({company: company}));
      this.toastrService.success('The company was successfully updated.');
      this.toggleEdit();
    }).finally(() => this.spinner.hide());
  }

  public deleteLogo(): void {
    this.logoPreviewUrl = null;
    this.selectedFile = null;
  }

  public back(event: Event): void {
    event.preventDefault();
    this.companyService.singleCompanyId.next(undefined);
    this.router.navigate(['/companies']);
  }
}
