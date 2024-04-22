import { Component } from '@angular/core';
import { AlertsService } from '../../../core/services/alerts.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-registros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-registros.component.html',
  styleUrl: './all-registros.component.css'
})
export default class AllRegistrosComponent {
  listAllSensores: any[] = [];

  constructor(private alertService: AlertsService){}

  ngOnInit(): void{
    this.alertService.getallSensors().subscribe(
      (response) => {
        this.listAllSensores = response.data;
        console.log(this.listAllSensores);
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
