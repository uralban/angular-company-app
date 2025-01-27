import { Component, OnInit } from '@angular/core';
import {CompanyDto} from '../../interfaces/company-dto';
import {PaginationMetaDto} from '../../interfaces/pagination-meta-dto';
import {Router} from '@angular/router';
import {CompanyService} from '../../services/company/company.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-companies',
  standalone: false,
  templateUrl: './companies.component.html'
})
export class CompaniesComponent implements OnInit {
  public mockCompanies: CompanyDto[] = [
    new CompanyDto('1', 'Company1'),
    new CompanyDto('2', 'Company2'),
    new CompanyDto('3', 'Company3'),
    new CompanyDto('4', 'Company4'),
    new CompanyDto('5', 'Company5'),
  ];
  public mockPaginationMeta: PaginationMetaDto = new PaginationMetaDto(1,3,this.mockCompanies.length, 2, false, true);
  public paginatedCompanyList: CompanyDto[] = [];

  constructor(
    private router: Router,
    private companyService: CompanyService
  ) {
  }

  public ngOnInit() {
    this.updatePaginateCompanyList();
  }

  public updatePaginateCompanyList(): void {
    const startIndex: number = (this.mockPaginationMeta.page - 1) * this.mockPaginationMeta.take;
    const endIndex: number = startIndex + this.mockPaginationMeta.take;
    this.paginatedCompanyList = this.mockCompanies.slice(startIndex, endIndex);
  }

  public onPageChange(event: PageEvent): void {
    this.mockPaginationMeta.page = event.pageIndex + 1;
    this.mockPaginationMeta.take = event.pageSize;
    this.updatePaginateCompanyList();
  }

  public openSinglePageCompany(company: CompanyDto): void {
    this.companyService.singleCompanyId.next(company.id as string);
    this.router.navigate(['company-profile']);
  }
}
