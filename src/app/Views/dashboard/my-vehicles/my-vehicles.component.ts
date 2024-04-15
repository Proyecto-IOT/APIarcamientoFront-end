import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { VehiclesService } from '../../../core/services/vehicles.service';
import Swal from 'sweetalert2';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-my-vehicles',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './my-vehicles.component.html',
  styleUrl: './my-vehicles.component.css'
})
export default class MyVehiclesComponent {
  hiddenPhoto = signal<boolean>(false);
  isformSubmitted: boolean = false;
  selectedVehicleId: Number = 0;
  vehicleInfo: any = {};
  vehicles: any[] = [];

  updateVehicleForm = new FormGroup({
    vehicle_id: new FormControl("", [Validators.required]),
    license_plate: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(9)]),
    brand: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    model: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    color: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(30)])
  })

  readonly breakPoint$ = this.breakPointObserver.observe(`(max-width: 500px)`);

  ngOnInit(): void{
    this.vehicleService.getUserVehicles().subscribe(
      (response) =>{
        if(response.result){
          this.vehicles = response.data;
        }
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

  
openModal(vehicle_id: Number): void{
  this.selectedVehicleId = vehicle_id;
  const modal = document.getElementById('exampleModal');
  if(modal){
    modal.setAttribute('data-vehicle-id', String(vehicle_id));
    this.vehicleService.searchVehicle(vehicle_id).subscribe(
      (response) =>{
        this.vehicleInfo = response.data;
        this.updateVehicleForm.patchValue({
         vehicle_id: response.data.vehicle_id,
         license_plate: response.data.license_plate,
         brand: response.data.brand,
         model: response.data.model,
         color: response.data.color
        })
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
}

  constructor(private vehicleService: VehiclesService, private router: Router, private breakPointObserver: BreakpointObserver){
    this.breakPoint$.subscribe(() => this.breakpointChanges())
  }

  breakpointChanges(): void{
    if(this.breakPointObserver.isMatched(`(max-width: 500px)`)){
      this.hiddenPhoto.set(true);
    }else{
      this.hiddenPhoto.set(false);
    }
  }

  guardarCambios(vehicle_id: Number){
    Swal.fire({
      title: "Estas seguro que quieres guardar los cambios?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Guardar cambios",
      cancelButtonText: "No, cancelar!"
    }).then((result) => {
      if (result.isConfirmed) {
        const isFormValid = this.updateVehicleForm.valid;
        this.isformSubmitted = true;
        if(isFormValid){
          const vehicleData = this.updateVehicleForm.value;
          console.log(vehicleData);
          this.vehicleService.updateVehicle(vehicleData, vehicle_id).subscribe(
            (response) =>{
              Swal.fire({
                title: "Se han guardado los cambios!",
                icon: "success"
              }).then(() =>{
                window.location.reload();
              });  
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
      }
    });
  }

  eliminar(vehicle_id: Number): void{
    Swal.fire({
      title: "Estas seguro que quieres eliminar esto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "No, cancelar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehicleService.deleteVehicle(vehicle_id).subscribe(
          (response) =>{
            Swal.fire({
              title: "Se ha eliminado con exito!",
              icon: "success"
            }).then(() =>{
              window.location.reload();
            });
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
    });
  }
}
