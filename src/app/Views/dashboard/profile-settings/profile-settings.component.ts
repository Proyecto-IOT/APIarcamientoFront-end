import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.css'
})
export default class ProfileSettingsComponent {
  isformSubmitted: boolean = false;
  userInfo: any = {};

  editUserForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(200)]),
    last_name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(200)]),
    mother_surname: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(200)]),
    gender: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  })

  ngOnInit(): void{
    this.userService.getUserInfo().subscribe(
      (response) => {
        this.userInfo = response.data;
        this.editUserForm.patchValue({
          name: response.data.name,
          last_name: response.data.last_name,
          mother_surname: response.data.mother_surname,
          gender: response.data.gender,
        })
      },
      (error) =>{
        Swal.fire({
          title: 'Error',
          text: error,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
           this.router.navigateByUrl('profileSettings')
          }
        });
      }
    )
  }

  constructor(private userService: UserService, private router: Router){}

  onSubmit(){
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
        const isFormValid = this.editUserForm.valid;
        this.isformSubmitted = true;
        if(isFormValid){
          const userData = this.editUserForm.value;
          this.userService.editUserInfo(userData).subscribe(
            (response) => {
              Swal.fire({
                title: '¡Se han actualizado los datos con éxito!',
                icon: 'success',
              }).then(() => {
                  window.location.reload();
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
