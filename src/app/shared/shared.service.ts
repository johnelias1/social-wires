import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private http: HttpClient) {}

  public view(url: string, params: HttpParams): Observable<Response> {
    return this.http.get<Response>(url, {
      params,
    });
  }
}
