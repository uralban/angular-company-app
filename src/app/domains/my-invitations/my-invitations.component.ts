import {Component, OnDestroy, OnInit} from '@angular/core';
import {PaginationMetaDto} from '../../interfaces/pagination/pagination-meta.dto';
import {Subject, takeUntil} from 'rxjs';
import {InvitationDto} from '../../interfaces/member/invitation.dto';
import {PowerSpinnerService} from '../../widgets/power-spinner/power-spinner.service';
import {Store} from '@ngrx/store';
import {PageEvent} from '@angular/material/paginator';
import {PaginationDto} from '../../interfaces/pagination/pagination.dto';
import {MemberService} from '../../services/member/member.service';
import {invitationListDataSuccess} from '../../state/invitation-list';

@Component({
  selector: 'app-my-invitations',
  standalone: false,
  templateUrl: './my-invitations.component.html'
})
export class MyInvitationsComponent implements OnInit, OnDestroy {

  public paginationMeta: PaginationMetaDto = new PaginationMetaDto(1, 3);
  public paginatedInvitationList: InvitationDto[] = [];
  private readonly ngDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private spinner: PowerSpinnerService,
    private store$: Store,
    private memberService: MemberService,
  ) {
  }

  public ngOnInit(): void {
    this.getInvitationsListStoreSubscribe();
    this.needReloadInvitationsListDataSubscribe();
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  public onPageChange(event: PageEvent): void {
    this.paginationMeta.page = event.pageIndex + 1;
    this.paginationMeta.take = event.pageSize;
    this.updatePaginateInvitationsList();
  }

  private updatePaginateInvitationsList(): void {
    this.spinner.show();
    this.memberService.getAllInvitations({
      page: this.paginationMeta.page,
      take: this.paginationMeta.take,
    }).then((paginationDto: PaginationDto<InvitationDto>): void => {
      this.store$.dispatch(invitationListDataSuccess({invitationListData: paginationDto}));
      this.memberService.needReloadInvitationsListData$.next(false);
    }).finally(() => this.spinner.hide());
  }

  private getInvitationsListStoreSubscribe(): void {
    this.memberService.storedInvitationsListData$.pipe(takeUntil(this.ngDestroy$)).subscribe(invitationListData => {
      if (invitationListData) {
        this.paginatedInvitationList = invitationListData.data;
        this.paginationMeta.itemCount = invitationListData.meta.itemCount;
        this.paginationMeta.take = invitationListData.meta.take;
        this.paginationMeta.page = invitationListData.meta.page;
      }
    });
  }

  private needReloadInvitationsListDataSubscribe(): void {
    this.memberService.needReloadInvitationsListData$.pipe(takeUntil(this.ngDestroy$)).subscribe((flag: boolean): void => {
      if (flag) this.updatePaginateInvitationsList();
    });
  }
}
