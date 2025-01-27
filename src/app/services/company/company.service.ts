import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  public singleCompanyId: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);

  constructor() { }
}
