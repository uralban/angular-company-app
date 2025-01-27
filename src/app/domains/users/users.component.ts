import {Component, OnInit} from '@angular/core';
import {UserDto} from '../../interfaces/user-dto';
import {Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import {PaginationMetaDto} from '../../interfaces/pagination-meta-dto';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  public mockUsers: UserDto[] = [
    new UserDto('1', 'example@gmail.com', 'John1', 'Doe'),
    new UserDto('2', 'example@gmail.com', 'John2', 'Doe'),
    new UserDto('3', 'example@gmail.com', 'John3', 'Doe'),
    new UserDto('4', 'example@gmail.com', 'John4', 'Doe'),
    new UserDto('5', 'example@gmail.com', 'John5', 'Doe'),
    new UserDto('6', 'example@gmail.com', 'John6', 'Doe'),
    new UserDto('7', 'example@gmail.com', 'John7', 'Doe'),
    new UserDto('8', 'example@gmail.com', 'John8', 'Doe'),
  ];
  public mockPaginationMeta: PaginationMetaDto = new PaginationMetaDto(1,3,this.mockUsers.length, 3, false, true);
  public paginatedUserList: UserDto[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
  ) {
  }

  public ngOnInit(): void {
    this.updatePaginateUsersList();
  }

  public openSinglePageUser(user: UserDto): void {
    this.userService.singleUserId.next(user.id as string);
    this.router.navigate(['users/user-profile']);
  }

  public onPageChange(event: PageEvent): void {
    this.mockPaginationMeta.page = event.pageIndex + 1;
    this.mockPaginationMeta.take = event.pageSize;
    this.updatePaginateUsersList();
  }

  public updatePaginateUsersList(): void {
    const startIndex: number = (this.mockPaginationMeta.page - 1) * this.mockPaginationMeta.take;
    const endIndex: number = startIndex + this.mockPaginationMeta.take;
    this.paginatedUserList = this.mockUsers.slice(startIndex, endIndex);
  }
}
