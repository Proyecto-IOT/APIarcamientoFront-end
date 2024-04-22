import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AlertsService } from '../../../core/services/alerts.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css'
})
export default class AlertsComponent {
  hiddenPhoto = signal<boolean>(false);
  alertasHumo: any[] = []; 
  alertasSonido: any[] = [];
  p: number | undefined = 1;
  ps: number | undefined = 1;
  noHay = signal<boolean>(false);
  
  alertas = new FormGroup({
    id: new FormControl(1, [Validators.required])
  })

  readonly breakPoint$ = this.breakPointObserver.observe(`(max-width: 500px)`);

  ngOnInit(): void{
    this.getHumoAlertas();
    this.getSonidoAlertas();
  }

  constructor(private breakPointObserver: BreakpointObserver, private router: Router, private alertService: AlertsService){
    this.breakPoint$.subscribe(() => this.breakpointChanges())
  }

  breakpointChanges(): void{
    if(this.breakPointObserver.isMatched(`(max-width: 500px)`)){
      this.hiddenPhoto.set(true);
    }else{
      this.hiddenPhoto.set(false);
    }
  }

  getHumoAlertas(){
    const idSensor = this.alertas.value;
    this.alertService.getHumoAlerts(idSensor).subscribe(
      (response) => {
        this.alertasHumo = response.data.Data;
        this.noHay.set(true);
        console.log(this.alertasHumo);
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
    );
  }

  getSonidoAlertas(){
    const idSensor = this.alertas.value;
    this.alertService.getSonidoAlerts(idSensor).subscribe(
      (response) => {
        this.alertasSonido = response.data.Data;
        this.noHay.set(true);
      },
      (error) =>{
        Swal.fire({
          title: 'Error',
          text: error,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }

  ngOnDestroy(): void{
    this.alertService.stopDataPolling();
  }
}
