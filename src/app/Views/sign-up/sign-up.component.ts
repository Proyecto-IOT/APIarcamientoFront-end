import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export default class SignUpComponent {
  isformSubmitted: boolean = false;

  signupForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(200)]),
    last_name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(200)]),
    mother_surname: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(200)]),
    gender: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}')]),
    password: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  })

  constructor(private userService: UserService, private router: Router){}

  onSubmit(){
    const isformSubmitted = this.signupForm.valid;
    this.isformSubmitted = true;
    const userData = this.signupForm.value;

    if(isformSubmitted){
      this.userService.newUser(userData).subscribe(
        (response) => {
          Swal.fire({
            icon: "success",
            title: "Te registraste!!!",
            text: "Se te redireccionara a la pagina de inicio de sesion",
            showConfirmButton: false,
            timer: 1500,
            didClose: () => {
              this.router.navigateByUrl('/login');
            }
          });
        },
        (error) => {
          console.error('Error: ', error)
        }
      )
    }
  }
}
