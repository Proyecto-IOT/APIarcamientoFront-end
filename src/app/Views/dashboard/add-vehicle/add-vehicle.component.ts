import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { VehiclesService } from '../../../core/services/vehicles.service';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.css'
})
export default class AddVehicleComponent {
  isformSubmitted: boolean = false;

  vehicleForm = new FormGroup({
    license_plate: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(9)]),
    brand: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    model: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    color: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(30)])
  })

  constructor(private vehicleService: VehiclesService, private router: Router){}

  onSubmit(){
    Swal.fire({
      title: "Estas seguro que quieres registrar este vehículo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "No, cancelar!"
    }).then((result) => {
      if (result.isConfirmed) {
        const isFormValid = this.vehicleForm.valid;
        this.isformSubmitted = true;
        if(isFormValid){
          const vehicleData = this.vehicleForm.value;
         this.vehicleService.newVehicle(vehicleData).subscribe(
            (response) => {
              Swal.fire({
                title: '¡Se ha registrado el vehículo con éxito!',
                icon: 'success',
              }).then(() => {
                  this.router.navigateByUrl('/dashboard/myVehicles');
              });
            },
            (error) => {
              Swal.fire({
                title: 'Error',
                text: error,
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          )
        }
      }
    });
  }
}
