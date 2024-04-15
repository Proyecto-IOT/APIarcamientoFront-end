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
  vehicles: any = {};

  vehicleForm = new FormGroup({
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

  
openModal(vehicle_id: number): void{
  this.selectedVehicleId = vehicle_id;
  const modal = document.getElementById('exampleModal');
  if(modal){
    modal.setAttribute('data-vehicle-id', String(vehicle_id));
    //FALTA LA CONSULTA INDIVIDUAL 😿
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

  guardarCambios(vehicle_id: Number): void{
    Swal.fire({
      title: "Estas seguro que quieres guardar los cambios?",
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
                title: '¡Se han actualizado los datos con éxito!',
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

  eliminar(vehicle_id: number): void{
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
