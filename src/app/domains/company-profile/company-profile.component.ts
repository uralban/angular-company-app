import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompanyDto} from '../../interfaces/company-dto';
import {ToastrService} from 'ngx-toastr';
import {CompanyService} from '../../services/company/company.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-company-profile',
  standalone: false,
  templateUrl: './company-profile.component.html'
})
export class CompanyProfileComponent implements OnInit, OnDestroy {

  public id: string | undefined;
  private readonly ngDestroy$: Subject<void> = new Subject<void>();
  public isEditing: boolean = false;
  public company: CompanyDto = new CompanyDto('1', 'Company1');
  public editCompanyForm: FormGroup;

  constructor(
    private router: Router,
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.editCompanyForm = this.editCompanyFormInit();
  }

  public ngOnInit(): void {
    this.checkCompanyId();
    this.setDefaultValues();
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
    this.companyService.singleCompanyId.next(undefined);
  }

  public editCompanyFormInit(): FormGroup {
    return this.formBuilder.group({
      name: [undefined, Validators.pattern(/^([A-Za-z])+$/)]
    })
  }

  private setDefaultValues(): void {
    this.editCompanyForm.get('name')?.setValue(this.company.name);
  }

  private checkCompanyId(): void {
    this.companyService.singleCompanyId.pipe(takeUntil(this.ngDestroy$)).subscribe(id => {
      if (!id) {
        this.router.navigate(['/companies']);
      } else {
        this.id = id;
      }
    });
  }

  public toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  public saveChanges(): void {
    this.toggleEdit();
    this.toastr.success('Successfully updated company');
  }

  public deleteAvatar(): void {
    this.toastr.success('Successfully deleted avatar');
  }


}
