import {HttpClient, HttpResponse} from '@angular/common/http';
import {DTO} from '../interfaces/dto.interface';
import {map, Observable} from 'rxjs';

export class HttpService {

  constructor(
    protected httpClient: HttpClient,
  ) {
  }

  protected getDataWithPagination<T extends DTO>(
    url: string,
    dtoFactory: (data: any) => T,
    params?: { [param: string]: string }): Observable<T> {

    return this.httpClient.get(url, {params: params}).pipe(
      map((data: any): T => {
        let entity: T = dtoFactory(data);
        if (data) {
          entity.populateFromDTO(data);
        }
        return entity;
      })
    );
  }

  protected getOne<T extends DTO>(
    url: string,
    dtoType: new () => T,
    params?: { [param: string]: string }): Observable<T> {

    return this.httpClient.get(url, {params: params}).pipe(
      map((data: any): T => {
        let entity: T = new dtoType();
        if (data) {
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

  protected getAllForSimpleTypeResults<T>(
    url: string,
    params?: { [param: string]: string }): Observable<T[]> {

    return this.httpClient.get(url, {params: params}).pipe(
      map((dataArray: any) => dataArray)
    );
  }

  protected post(
    url: string,
    urlParams?: { [param: string]: string },
    payload?: any): Observable<any> {

    return this.httpClient.post(url, payload, {params: urlParams});
  }

  protected postForResponseStatus(
    url: string,
    payload?: any,
    params?: { [param: string]: string }
  ): Observable<any> {
    return this.httpClient.post(url, payload, {params: params, observe: 'response'}).pipe(
      map(response => {
          return response.status;
        }
      )
    );
  }

  protected postForResult<T extends DTO>(
    url: string,
    dtoType: new () => T,
    urlParams?: { [param: string]: string },
    payload?: any): Observable<T> {

    return this.httpClient.post(url, payload, {params: urlParams}).pipe(
      map((data: any): T => {
        let entity: T = new dtoType();
        if (data) {
          entity.populateFromDTO(data);
        }
        return entity;
      })
    );
  }

  protected patchForResult<T extends DTO>(
    url: string,
    dtoType: new () => T,
    urlParams?: { [param: string]: string },
    payload?: any): Observable<T> {

    return this.httpClient.patch(url, payload, {params: urlParams}).pipe(
      map((data: any): T => {
        let entity: T = new dtoType();
        if (data) {
          entity.populateFromDTO(data);
        }
        return entity;
      })
    );
  }

  protected patch(
    url: string,
    urlParams?: { [param: string]: string },
    payload?: any): Observable<any> {
    return this.httpClient.patch(url, payload, {params: urlParams});
  }

  protected deleteForResult<T extends DTO>(
    url: string,
    dtoType: new () => T,
    urlParams?: { [param: string]: string },
    payload?: any): Observable<T> {

    return this.httpClient.delete(url, {params: urlParams}).pipe(
      map((data: any): T => {
        let entity: T = new dtoType();
        if (data) {
          entity.populateFromDTO(data);
        }
        return entity;
      })
    );
  }

  protected delete(
    url: string,
    urlParams?: { [param: string]: string },
    payload?: any): Observable<any> {

    return this.httpClient.delete(url, {params: urlParams});
  }

  protected getOneForSimpleTypeResults<T>(
    url: string,
    params?: { [param: string]: string }): Observable<T> {

    return this.httpClient.get(url, {params: params}).pipe(
      map((data: any) => data)
    );
  }


  protected getFile(
    url: string,
    params?: { [param: string]: string }): Observable<HttpResponse<Blob>> {
    return this.httpClient.get(url, {params: params, responseType: 'blob', observe: 'response'}
    );
  }


}
