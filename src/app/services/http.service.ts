import {HttpClient} from '@angular/common/http';
import {DTO} from '../interfaces/dto.interface';
import {map, Observable} from 'rxjs';

export class HttpService {

  constructor(
    protected httpClient: HttpClient,
  ) {
  }

  protected getOne<T extends DTO>(
    url: string,
    dtoType: new () => T,
    params?: { [param: string]: string }): Observable<T | undefined> {

    return this.httpClient.get(url, {params: params}).pipe(
      map((data: any) => {
        let entity: T | undefined;
        if (data) {
          entity = new dtoType();
          entity.populateFromDTO(data);
        }
        return entity;
      })
    );
  }

  protected getAll<T extends DTO>(
    url: string,
    dtoType: new () => T,
    params?: { [param: string]: string }): Observable<T[]> {

    return this.httpClient.get(url, {params: params}).pipe(
      map((dataArray: any) => {
        if (dataArray) {
          return dataArray.map((_d: T) => {
            let entity: T = new dtoType();
            entity.populateFromDTO(_d);
            return entity;
          });
        }
      })
    );
  }

  protected post(
    url: string,
    urlParams?: { [param: string]: string },
    payload?: any): Observable<any> {

    return this.httpClient.post(url, payload, {params: urlParams});
  }

  protected put(
    url: string,
    urlParams?: { [param: string]: string },
    payload?: any): Observable<any> {

    return this.httpClient.put(url, payload, {params: urlParams});
  }

  protected delete(
    url: string,
    urlParams?: { [param: string]: string },
    payload?: any): Observable<any> {

    return this.httpClient.delete(url, {params: urlParams});
  }


}
