import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, Subject, switchMap, takeUntil, timer } from 'rxjs';
import { time } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private alertsUrl: string;
  private stopPolling = new Subject();

  constructor(private http: HttpClient) { 
    this.alertsUrl = `${environment.apiUrlBase}arduino`;
  }

  getHumoAlerts(id: any): Observable<any>{
    return timer(0, 60000).pipe(
      switchMap(() => this.http.post(`${this.alertsUrl}/humo`, id)),
      takeUntil(this.stopPolling)
    )
  }

  stopDataPolling() {
    this.stopPolling.next(false);
  }

  getSonidoAlerts(id: any): Observable<any>{
    return timer(0, 60000).pipe(
      switchMap(() => this.http.post(`${this.alertsUrl}/sonido`, id)),
      takeUntil(this.stopPolling)
    )
  }
}
