import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  private parkingURL: string;

  constructor(private http: HttpClient) {
    this.parkingURL = `${environment.apiUrlBase}parking`;
   }

  getSpots(): Observable<any>{
    return this.http.get<any>(`${this.parkingURL}/search`);
  }

  getEstacionados(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrlBase}arduino/refresh`);
  }

  getInfoEstacionado(data: any, spot_id: Number): Observable<any>{
    return this.http.post(`${environment.apiUrlBase}vehicle/ocupate/${spot_id}`, data);
  }
}
