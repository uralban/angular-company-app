import {Component, OnDestroy, OnInit} from '@angular/core';
import {PaginationMetaDto} from '../../interfaces/pagination/pagination-meta.dto';
import {Subject, takeUntil} from 'rxjs';
import {RequestDto} from '../../interfaces/member/request.dto';
import {PowerSpinnerService} from '../../widgets/power-spinner/power-spinner.service';
import {Store} from '@ngrx/store';
import {MemberService} from '../../services/member/member.service';
import {PageEvent} from '@angular/material/paginator';
import {PaginationDto} from '../../interfaces/pagination/pagination.dto';
import {requestListDataSuccess} from '../../state/request-list';

@Component({
  selector: 'app-my-requests',
  standalone: false,
  templateUrl: './my-requests.component.html'
})
export class MyRequestsComponent implements OnInit, OnDestroy {

  public paginationMeta: PaginationMetaDto = new PaginationMetaDto(1, 3);
  public paginatedRequestList: RequestDto[] = [];
  private readonly ngDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private spinner: PowerSpinnerService,
    private store$: Store,
    private memberService: MemberService,
  ) {
  }

  public ngOnInit(): void {
    this.getRequestsListStoreSubscribe();
    this.needReloadRequestsListDataSubscribe();
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  public onPageChange(event: PageEvent): void {
    this.paginationMeta.page = event.pageIndex + 1;
    this.paginationMeta.take = event.pageSize;
    this.updatePaginateRequestsList();
  }

  private updatePaginateRequestsList(): void {
    this.spinner.show();
    this.memberService.getAllRequests({
      page: this.paginationMeta.page,
      take: this.paginationMeta.take,
    }).then((paginationDto: PaginationDto<RequestDto>): void => {
      this.store$.dispatch(requestListDataSuccess({requestListData: paginationDto}));
      this.memberService.needReloadRequestsListData$.next(false);
    }).finally(() => this.spinner.hide());
  }

  private getRequestsListStoreSubscribe(): void {
    this.memberService.storedRequestsListData$.pipe(takeUntil(this.ngDestroy$)).subscribe(requestListData => {
      if (requestListData) {
        this.paginatedRequestList = requestListData.data;
        this.paginationMeta.itemCount = requestListData.meta.itemCount;
        this.paginationMeta.take = requestListData.meta.take;
        this.paginationMeta.page = requestListData.meta.page;
      }
    });
  }

  private needReloadRequestsListDataSubscribe(): void {
    this.memberService.needReloadRequestsListData$.pipe(takeUntil(this.ngDestroy$)).subscribe((flag: boolean): void => {
      if (flag) this.updatePaginateRequestsList();
    });
  }

}
