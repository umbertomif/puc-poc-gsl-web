import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import Swal from 'sweetalert2';

export abstract class ResourceService<T> {

  private resourceUrl: string

  constructor(
    private http: HttpClient,
    private resourceName: string,
    private apiUrl: string
  ) {
    this.resourceUrl = `${this.apiUrl}/${this.resourceName}`
  }

  get headers() {
    if (this.resourceName == "sync") {
      return new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", sessionStorage.getItem('token'))
        .set("Repository", sessionStorage.getItem('repository'))
    }
    else if (this.resourceName == 'agree-terms' || this.resourceName == 'content-terms' || this.resourceName == 'terms') {
      return new HttpHeaders()
        .set("Content-Type", "application/json")
    }
    else {
      if (sessionStorage.getItem('UserId') == null) {
        return new HttpHeaders()
          .set("Content-Type", "application/json")
          .set("Authorization", sessionStorage.getItem('token'))
          .set("UserId", 'aaa')
      }
      else {
        return new HttpHeaders()
          .set("Content-Type", "application/json")
          .set("Authorization", sessionStorage.getItem('token'))
          .set("UserId", sessionStorage.getItem('UserId'))
      }

    }
  }

  protected get(): Observable<Array<T>> {
    return this.http
      .get<Array<T>>(this.resourceUrl, {
        headers: this.headers
      })
      .pipe(

        catchError(this.handleError)
      )
  }

  protected getByQuery<T>(query: string): Observable<T> {
    return this.http
      .get<T>(`${this.resourceUrl}/${query}`, {
        headers: this.headers
      })
      .pipe(
        catchError(this.handleError)
      )
  }

  protected getByQueryAlt<T>(query: string): Observable<T> {
    return this.http
      .get<T>(`${this.resourceUrl}?${query}`, {
        headers: this.headers
      })
      .pipe(
        catchError(this.handleError)
      )
  }

  protected getByQueryItem(query: string): Observable<T> {
    return this.http
      .get<T>(`${this.resourceUrl}/${query}`, {
        headers: this.headers
      })
      .pipe(
        catchError(this.handleError)
      )
  }


  protected getBy(resourceId: string): Observable<T> {
    console.log(`${this.resourceUrl}/${resourceId}`)
    return this.http
      .get<T>(`${this.resourceUrl}/${encodeURIComponent(String(resourceId))}`, {
        headers: this.headers
      })
      .pipe(
        catchError(this.handleError)
      )
  }

  protected getNoHeadersBy(resourceId: string): Observable<T> {
    console.log(`${this.resourceUrl}/${resourceId}`)
    return this.http
      .get<T>(`${this.resourceUrl}/${encodeURIComponent(String(resourceId))}`, {
      })
      .pipe(
        catchError(this.handleError)
      )
  }

  protected create(resource: T): Observable<T> {
    if (resource == null) {
      throw new Error('Recurso não informado.');
    }

    return this.http
      .post<T>(`${this.resourceUrl}`, resource, {
        headers: this.headers
      })
      .pipe(
        catchError(this.handleError)
      )
  }

  protected createQuery(resource: T, query: string): Observable<T> {
    if (resource == null) {
      throw new Error('Recurso não informado.');
    }

    return this.http
      .post<T>(`${this.resourceUrl}?${query}`, resource, {
        headers: this.headers
      })
      .pipe(
        catchError(this.handleError)
      )
  }

  protected patch(body: any): Observable<any> {
    return this.http
      .patch<any>(`${this.resourceUrl}`, body, {
        headers: this.headers
      })
      .pipe(
        catchError(this.handleError)
      )
  }

  protected patchWithQuery(query: string, body: any): Observable<any> {
    return this.http
      .patch<any>(`${this.resourceUrl}/${query}`, body, {
        headers: this.headers
      })
      .pipe(
        catchError(this.handleError)
      )
  }

  protected patchWithIdNumber(id: number, body: any): Observable<any> {
    return this.http
      .patch<any>(`${this.resourceUrl}/${id}`, body, {
        headers: this.headers
      })
      .pipe(
        catchError(this.handleError)
      )
  }

  protected postWithQuery<TReturn, TInput>(query: string, body: TInput): Observable<TReturn> {
    return this.http
      .post<TReturn>(`${this.resourceUrl}/${query}`, body, {
        headers: this.headers
      })
      .pipe(
        catchError(this.handleError)
      )
  }

  protected replaceWithQuery<TReturn, TInput>(query: string, body: TInput): Observable<TReturn> {
    return this.http
      .put<TReturn>(`${this.resourceUrl}/${query}`, body, {
        headers: this.headers
      })
      .pipe(
        catchError(this.handleError)
      )
  }

  protected replace(resource: T, resourceId: string): Observable<T> {
    return this.http
      .put<T>(`${this.resourceUrl}/${encodeURIComponent(String(resourceId))}`, resource, {
        headers: this.headers
      })
      .pipe(
        catchError(this.handleError)
      )
  }

  protected update(resource: any, resourceId: string): Observable<any> {
    if (resource == null) {
      throw new Error('Recurso não informado.');
    }

    return this.http
      .patch<any>(`${this.resourceUrl}/${encodeURIComponent(String(resourceId))}`, resource, {
        headers: this.headers
      })
      .pipe(
        catchError(this.handleError)
      )
  }

  protected delete(resourceId: string): Observable<T> {
    return this.http
      .delete<T>(`${this.resourceUrl}/${encodeURIComponent(String(resourceId))}`, {
        headers: this.headers
      })
      .pipe(
        catchError(this.handleError)
      )
  }

  protected deleteByQuery<T>(query: string, resourceId: string): Observable<T> {


    return this.http
      .delete<T>(`${this.resourceUrl}/${query}/${encodeURIComponent(String(resourceId))}`, {
        headers: this.headers
      })
      .pipe(
        catchError(this.handleError)
      )
  }

  protected getFormattedParams(name: string, params: string[]): string {
    let result = ""

    console.log(params);

    if (!params || params.length == 0) {
      return result
    }

    for (const id of params) {
      result += `${result.length > 0 ? "&" : ""}${name}=${id}`
    }

    return result
  }

  protected handleError(error: HttpErrorResponse) {

    if (error.error) {
      // swal.fire('Ops!', error.error.message, 'warning');
      return throwError('Algo errado aconteceu; por favor, tente novamente.')
    }
    else {
      // swal.fire('Ops!', 'Ocorreu um erro no sistema, tente novamente mais tarde', 'warning');
      return throwError('Algo errado aconteceu; por favor, tente novamente.')
    }

    if (error.error instanceof ErrorEvent) {
      if (error.error)
        console.error('Um erro ocorreu:', error.error.message)
      else
        console.error('Um erro ocorreu:', error.error)
    } else {
      console.error(
        `código de retorno: ${error.status}, ` +
        `corpo: ${error.error}`)
    }
    return throwError(
      'Algo errado aconteceu; por favor, tente novamente.'
    )
  }



}