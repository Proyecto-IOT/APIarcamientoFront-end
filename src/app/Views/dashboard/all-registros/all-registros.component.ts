import { Component, NgModule } from '@angular/core';
import { AlertsService } from '../../../core/services/alerts.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-registros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './all-registros.component.html',
  styleUrl: './all-registros.component.css'
})
export default class AllRegistrosComponent {
  listAllSensores: any[] = [];
  properties: string[] = [];
  filterProperty: string = '';

  constructor(private alertService: AlertsService){}

  ngOnInit(): void{
    this.alertService.getallSensors().subscribe(
      (response) => {
        const primerSensor = response.data.find((objeto: any) => Array.isArray(objeto.Sensor));
        if (primerSensor) {
          this.listAllSensores = primerSensor.Sensor;
          console.log(this.listAllSensores);
        } else {
          console.error('No se encontró ningún objeto con la propiedad Sensor');
        }
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

  filterSensor(sensorName: string): boolean {
    if (this.properties.length === 0 || this.properties.includes('todos')) {
      return true;
    }

    return this.properties.includes(sensorName);
  }
  
  filterDate(date: string): boolean {
    if (!this.filterProperty) return true; 

    const selectedDate = this.filterProperty.split('T')[0];
    const parsedSelectedDate = new Date(selectedDate);
    const itemDate = date.split(' ')[0];
    const parsedItemDate = new Date(itemDate);
  
    return parsedSelectedDate.getTime() === parsedItemDate.getTime();
  }
}
