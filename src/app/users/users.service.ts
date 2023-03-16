import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../shared/interfaces/user';
import { environment } from 'src/environments/environment';
import { MyStorage as CacheStorage } from '../shared/storage/src/lib/MyStorage.model';
import jwt_decode from 'jwt-decode';

interface IsLoggedIn {
  user: User;
  status: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private httpOptions;
  serviceUrl: string;
  private currentUserSubject: BehaviorSubject<User>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(this.userData);
    this.serviceUrl = environment.apiSocialWires;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'true',
      }),
    };
  }

  public userData!: User;

  setUserData(gToken: string) {
    const decoded = jwt_decode<any>(gToken);
    this.userData = {
      id: decoded.userId,
      nickname: decoded.username,
    };
    this.currentUserSubject.next(this.userData);
    CacheStorage.setItem('accessToken', gToken);
  }

  getdata() {
    if (this.isAuthenticated()) {
      const gToken = this.token;
      this.setUserData(gToken);
    }
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  get token(): string {
    return CacheStorage.getItem('accessToken');
  }

  signup(form: any) {
    return this.http.post(
      `${this.serviceUrl}/auth/signup`,
      form,
      this.httpOptions
    );
  }

  signin(form: any) {
    const body = JSON.stringify(form);

    return this.http.post(`${this.serviceUrl}/auth/signin`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
      }),
    });
  }

  // getUserData(): Observable<IsLoggedIn> {
  //   return this.http.get<IsLoggedIn>(`${this.serviceUrl}/auth/getUserData`, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json; charset=utf-8',
  //       Authorization: 'true',
  //     }),
  //   });
  // }

  logout() {
    CacheStorage.clear();
    this.currentUserSubject.next({ id: '', nickname: '' });
  }
}
