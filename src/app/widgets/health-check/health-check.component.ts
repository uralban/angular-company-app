import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {HealthCheckService} from './health-check.service';

@Component({
  selector: 'health-check',
  imports: [
    NgIf
  ],
  providers: [
    HealthCheckService
  ],
  templateUrl: './health-check.component.html',
})
export class HealthCheckComponent implements OnInit {

  public status: number | undefined;

  constructor(private readonly  healthCheckService: HealthCheckService) {
  }

  public ngOnInit() {
    this.healthCheckService.getHealthCheckData().then(data => {
      this.status = data?.status_code;
    });
  }

}
