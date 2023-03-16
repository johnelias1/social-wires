import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private serviceUrl = '';
  private httpOptions;
  constructor(private http: HttpClient) {
    this.serviceUrl = environment.apiSocialWires;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'true',
      }),
    };
  }

  createMessage(form: object) {
    return this.http.post(
      `${this.serviceUrl}/messages`,
      form,
      this.httpOptions
    );
  }

  listMessages() {
    return this.http.get(
      `${this.serviceUrl}/messages`,
      this.httpOptions
    );
  }

  getMostRecentMessages() {
    return this.http.get(
      `${this.serviceUrl}/messages/me`,
      this.httpOptions
    );
  }

  getMessagesId(id:string) {
    return this.http.get(
      `${this.serviceUrl}/messages/me/${id}`,
      this.httpOptions
    );
  }
}
