import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserDto} from '../../interfaces/user/user.dto';
import {Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import {PaginationMetaDto} from '../../interfaces/pagination/pagination-meta.dto';
import {PageEvent} from '@angular/material/paginator';
import {PowerSpinnerService} from '../../widgets/power-spinner/power-spinner.service';
import {PaginationDto} from '../../interfaces/pagination/pagination.dto';
import {Store} from '@ngrx/store';
import {usersListDataSuccess} from '../../state/users-list';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit, OnDestroy {

  public paginationMeta: PaginationMetaDto = new PaginationMetaDto(1, 3);
  public paginatedUserList: UserDto[] = [];
  private readonly ngDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private userService: UserService,
    private spinner: PowerSpinnerService,
    private store$: Store
  ) {
  }

  public ngOnInit(): void {
    this.getUsersListStoreSubscribe();
    this.needReloadUsersListDataSubscribe();
  }

  public ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  public openSinglePageUser(user: UserDto): void {
    this.userService.singleUserId$.next(user.id as string);
    this.router.navigate(['users/user-profile']);
  }

  public onPageChange(event: PageEvent): void {
    this.paginationMeta.page = event.pageIndex + 1;
    this.paginationMeta.take = event.pageSize;
    this.updatePaginateUsersList();
  }

  private updatePaginateUsersList(): void {
    this.spinner.show();
    this.userService.getAllUser({
      page: this.paginationMeta.page,
      take: this.paginationMeta.take,
    }).then((paginationDto: PaginationDto<UserDto>): void => {
      this.store$.dispatch(usersListDataSuccess({usersListData: paginationDto}));
      this.userService.needReloadUsersListData$.next(false);
    }).finally(() => this.spinner.hide());
  }

  private getUsersListStoreSubscribe(): void {
    this.userService.storedUsersListData$.pipe(takeUntil(this.ngDestroy$)).subscribe(usersListData => {
      if (usersListData) {
        this.paginatedUserList = usersListData.data;
        this.paginationMeta.itemCount = usersListData.meta.itemCount;
        this.paginationMeta.take = usersListData.meta.take;
        this.paginationMeta.page = usersListData.meta.page;
      }
    });
  }

  private needReloadUsersListDataSubscribe(): void {
    this.userService.needReloadUsersListData$.pipe(takeUntil(this.ngDestroy$)).subscribe((flag: boolean): void => {
      if (flag) this.updatePaginateUsersList();
    });
  }

}
