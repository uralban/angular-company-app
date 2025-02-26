import {AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DialogData} from '../../../../../interfaces/dialog-data.interface';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PowerSpinnerService} from '../../../../../widgets/power-spinner/power-spinner.service';
import {Subject, takeUntil} from 'rxjs';
import {CompanyService} from '../../../../../services/company/company.service';
import {MemberDto} from '../../../../../interfaces/member/member.dto';
import {UserDto} from '../../../../../interfaces/user/user.dto';
import {Member} from '../../../../../interfaces/member/member.interface';
import {Chart} from 'chart.js/auto';
import {AnalyticService} from '../../../../../services/analytic/analytic.service';
import {UserWithScoresDto} from '../../../../../interfaces/quiz/user-with-scores.dto';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-quizzes-analytic-modal',
  standalone: false,
  templateUrl: './quizzes-analytic-modal.component.html',
  styles: [`canvas { max-width: 100%; height: 400px; }`]
})
export class QuizzesAnalyticModalComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  readonly data: DialogData = inject<DialogData>(MAT_DIALOG_DATA);
  private readonly ngDestroy$: Subject<void> = new Subject<void>();

  public companyMembersList: Member[] = [];
  public chartData$: Subject<UserWithScoresDto[]> = new Subject();
  public companyId: string | undefined = undefined;
  private chartInstance: any;

  protected readonly Number = Number;

  constructor(
    private spinner: PowerSpinnerService,
    private companyService: CompanyService,
    private analyticService: AnalyticService,
  ) {
  }

  public ngOnInit(): void {
    this.companyService.storedCurrentCompanyData$.pipe(
      takeUntil(this.ngDestroy$)
    ).subscribe(company => {
      if (company && company.members) {
        this.companyId = company.id;
        this.companyMembersList = company.members.map((member: MemberDto) => {
          const newMember: Member = {
            id: member.id,
          }
          if (member.user) {
            newMember._memberName = this.getUserName(member.user);
            newMember.userId = member.user.id;
          }
          if (member.role) newMember.role = member.role.roleName;
          return newMember;
        });
        this.memberChange();
      }
    });
  }

  public ngAfterViewInit(): void {
    this.chartData$.pipe(takeUntil(this.ngDestroy$)).subscribe(data => {
      this.renderChart(data);
      this.setTotalScoreList(data);
    });
  }

  public ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  public setTotalScoreList(data: UserWithScoresDto[]): void {
    data.forEach((user: UserWithScoresDto) => {
      const member: Member | undefined = this.companyMembersList.find(member => member._memberName === user.userName);
      const score: string | undefined = user.quizzesScore?.sort((a,b) => {
        if (b.attemptDate && a.attemptDate) {
          return new Date(a.attemptDate).getTime() - new Date(b.attemptDate).getTime()
        }
        return 0;
      })[user.quizzesScore?.length - 1].score;
      if (score && member) member._memberScore = score;
    });
  }

  public getUserName(user: UserDto): string {
    if (!user.firstName && !user.lastName) {
      return user.emailLogin || '';
    } else if (user.firstName && user.lastName) {
      return user.firstName + ' ' + user.lastName;
    } else {
      return user.firstName ? user.firstName : user.lastName || '';
    }
  }

  public memberChange(): void {
    if (this.companyId) {
      this.spinner.show();
      this.analyticService.getAllUserScoreInCompany(this.companyId).then((res) => {
        this.chartData$.next(res || []);
      }).finally(() => this.spinner.hide());
    }
  }

  public renderChart(data: UserWithScoresDto[]): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
    const datasets = data.map(user => {
      const chartData = user.quizzesScore?.map(item => ({
        x: item.attemptDate ? new Date(item.attemptDate) : null,
        y: item.score ? parseFloat(item.score) : null
      })).filter(item => item.x && item.y !== null) || [];

      return {
        label: user.userName,
        data: chartData,
        borderColor: this.getRandomColor(),
        fill: false,
        tension: 0.4
      };
    });
    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'hour',
              displayFormats: { hour: 'dd.MM.yyyy, HH:mm' },
              tooltipFormat: 'dd.MM.yyyy, HH:mm'
            },
            title: { display: true, text: 'Time' }
          },
          y: {
            beginAtZero: true,
            max: 1,
            title: { display: true, text: 'Score' }
          }
        }
      }
    });
  }

  public getRandomColor(): string {
    const r: number = Math.floor(Math.random() * 256);
    const g: number = Math.floor(Math.random() * 256);
    const b: number = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }
}
