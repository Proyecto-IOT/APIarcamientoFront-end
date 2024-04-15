import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  private vehiclesUrl: string;

  constructor(private http: HttpClient){
    this.vehiclesUrl = `${environment.apiUrlBase}vehicle`;
  }

  getUserVehicles(): Observable<any>{
    return this.http.get<any>(`${this.vehiclesUrl}/search`);
  }

  newVehicle(vehicleData: any): Observable<any>{
    return this.http.post(`${this.vehiclesUrl}/register`, vehicleData);
  }

  updateVehicle(vehicleData: any, vehicle_id: Number): Observable<any>{
    return this.http.put(`${this.vehiclesUrl}/update/${vehicle_id}`, vehicleData);
  }

  deleteVehicle(vehicle_id: Number): Observable<any>{
    return this.http.delete(`${this.vehiclesUrl}/delete/${vehicle_id}`);
  }
}
