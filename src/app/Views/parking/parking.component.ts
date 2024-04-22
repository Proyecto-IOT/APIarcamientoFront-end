import { Component, signal } from '@angular/core';
import { ParkingService } from '../../core/services/parking.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-parking',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './parking.component.html',
  styleUrl: './parking.component.css'
})
export default class ParkingComponent {
  spotsOcupados: any[] = [];
  hiddeParking = signal<boolean>(false);
  selectedSpotId: Number = 0;
  infOcupate: any = {};

  readonly breakPoint$ = this.breakPointObserver.observe(`(max-width: 500px)`);

  constructor(private parkingService: ParkingService, private breakPointObserver: BreakpointObserver){
    this.breakPoint$.subscribe(() => this.breakpointChanges())
  }

  breakpointChanges(): void{
    if(this.breakPointObserver.isMatched(`(max-width: 500px)`)){
      this.hiddeParking.set(true);
    }else{
      this.hiddeParking.set(false);
    }
  }

  ngOnInit(): void{
    this.getLugares();
  } 

  getLugares(){
    this.parkingService.getEstacionados().subscribe(
      (response) =>{
        this.spotsOcupados = response.data;
      },
      (error) =>{
        Swal.fire({
          title: 'Error',
          text: error,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    )
  }

  openModal(spot_id: Number): void{
    this.selectedSpotId = spot_id;
    const modal = document.getElementById('exampleModal');
    if(modal){
      modal.setAttribute('data-spot-id', String(spot_id));
      console.log(spot_id);
      const data = '';
      this.parkingService.getInfoEstacionado(data, this.selectedSpotId).subscribe(
        (response) => {
          this.infOcupate = response.data;
        },
        (error) =>{
          let errorMessage = '';
          if (error.errors && typeof error.errors === 'object') {
            errorMessage += '\nLos datos ingresados no cumplen con lo pedido: \n';
            for (const field in error.errors) {
              if (error.errors.hasOwnProperty(field)) {
                errorMessage += `\n${error.errors[field][0]}\n`;
              }
            }
        } 
        else{
          errorMessage += ' ' + error.msg;
        }
          Swal.fire({
            title: 'Error',
            text: errorMessage,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      )
    }
  }

  ngOndestroy(): void{
    this.parkingService.stopDataPolling();
  }
}
