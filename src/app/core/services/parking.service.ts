import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, Subject, switchMap, takeUntil, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  private parkingURL: string;
  private stopPolling = new Subject();

  constructor(private http: HttpClient) {
    this.parkingURL = `${environment.apiUrlBase}parking`;
   }

  getSpots(): Observable<any>{
    return this.http.get<any>(`${this.parkingURL}/search`);
  }

  getEstacionados(): Observable<any>{
    return timer(0, 60000).pipe(
      switchMap(() => this.http.get<any>(`${environment.apiUrlBase}arduino/refresh`)),
      takeUntil(this.stopPolling)
    );
  }

  stopDataPolling() {
    this.stopPolling.next(false);
  }

  getInfoEstacionado(data: any, spot_id: Number): Observable<any>{
    return this.http.post(`${environment.apiUrlBase}vehicle/ocupate/${spot_id}`, data);
  }
}
