import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {RequestDto} from '../../../interfaces/member/request.dto';
import {MatDialog} from '@angular/material/dialog';
import {Subject, takeUntil} from 'rxjs';
import {PowerSpinnerService} from '../../../widgets/power-spinner/power-spinner.service';
import {ToastrService} from 'ngx-toastr';
import {MemberService} from '../../../services/member/member.service';
import {environment} from '../../../../environments/environment';
import {UniversalModalComponent} from '../../../widgets/universal-modal/universal-modal.component';

@Component({
  selector: 'my-request-cart',
  standalone: false,
  templateUrl: './my-request-cart.component.html'
})
export class MyRequestCartComponent implements OnInit, OnDestroy {
  @Input() request!: RequestDto;

  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly ngDestroy$: Subject<void> = new Subject<void>();
  public logoUrl: string = '';

  constructor(
    private spinner: PowerSpinnerService,
    private readonly toastrService: ToastrService,
    private memberService: MemberService,
  ) {
  }

  public ngOnInit(): void {
    this.logoUrl = this.request?.company?.logoUrl ? this.request.company.logoUrl : environment.defaultCompanyLogo;
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  public declineRequest(): void {
    const dialogRef = this.dialog.open(UniversalModalComponent, {
      data: {
        title: 'Decline Request',
        message: 'Are you sure you want to decline request?',
      },
    });
    dialogRef.afterClosed().pipe(takeUntil(this.ngDestroy$)).subscribe(result => {
      if (result && this.request.id) {
        this.spinner.show();
        this.memberService.declineRequest(this.request.id).then(response => {
          this.toastrService.success(response.message);
          this.memberService.needReloadRequestsListData$.next(true);
        }).finally(() => this.spinner.hide());
      }
    });
  }
}
