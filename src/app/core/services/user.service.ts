import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl: string;
  private token: string | null = null;
  isLoggedIn = false;

  constructor(private http: HttpClient, private cookies: CookieService) {
    this.userUrl = `${environment.apiUrlBase}user`;
   }

   newUser(nuevoUser: any): Observable<any>{
    return this.http.post(`${this.userUrl}/register`, nuevoUser);
   }

   login(userData: any): Observable<any>{
    return this.http.post(`${this.userUrl}/login`, userData);
   }

   getToken(){
    this.token = this.cookies.get('token');
    return this.token;
   }

   isAuthenticated(): boolean {
    return !!this.getToken();
  }

   getUserInfo(): Observable<any>{
    return this.http.get<any>(`${this.userUrl}/user-info`);
   }

   logout(): Observable<any>{
    return this.http.post(`${this.userUrl}/logout`, '');
   }

   editUserInfo(userData: any): Observable<any>{
    return this.http.put(`${this.userUrl}/update`, userData);
   }
}
