import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private alertsUrl: string;

  constructor(private http: HttpClient) { 
    this.alertsUrl = `${environment.apiUrlBase}arduino`;
  }

  getHumoAlerts(id: any): Observable<any>{
    return this.http.post(`${this.alertsUrl}/humo`, id);
  }

  getSonidoAlerts(id: any): Observable<any>{
    return this.http.post(`${this.alertsUrl}/sonido`, id);
  }
}
