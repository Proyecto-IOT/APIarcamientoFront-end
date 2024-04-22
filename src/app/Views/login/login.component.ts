import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../core/services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  isformSubmitted: boolean = false;
  token: string | null = null;

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}')]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
  })
  
  constructor(private userService: UserService, private router: Router, private cookies: CookieService){}

  onSubmit(){
    const isformSubmitted = this.loginForm.valid;
    this.isformSubmitted = true;
    const userData = this.loginForm.value;

    if(isformSubmitted){
      this.userService.login(userData).subscribe(
        (response) => {
          this.cookies.set('token', response.data.token);
          window.location.href = '/home'
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

  
}
