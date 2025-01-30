import {DTO} from './dto.interface';

export class HealthCheckDto implements DTO{

  constructor(
    public status_code?: number,
    public detail?: string,
    public result?: string
  ) {}

  populateFromDTO(dto: any): void {
    this.status_code = dto['status_code'];
    this.detail = dto['detail'];
    this.result = dto['result'];
  }
}
