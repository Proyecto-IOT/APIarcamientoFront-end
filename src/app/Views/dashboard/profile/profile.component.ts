import { Component, Signal, signal } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';
import { Sign } from 'crypto';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export default class ProfileComponent {
  profilePhoto = signal<string>("");
  msg = signal<string>("");
  userInfo: any = {}

  ngOnInit(): void{
    this.userService.getUserInfo().subscribe(
      (response) =>{
        this.userInfo = response.data;
        this.profilePhoto.set(response.data.gender);

        if(response.data.gender == 'Femenino'){
          this.msg.set('Bienvenida');
        }else if(response.data.gender == 'Masculino'){
          this.msg.set('Bienvenido');
        }else if(response.data.gender == '39 tipos de gays'){
          this.msg.set('Bienvenidx');
        }
      },
      (error) =>{
        Swal.fire({
          title: 'Error',
          text: error,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
           this.router.navigateByUrl('profile')
          }
        });
      }
    )
  }

  ngOnDestroy(): void{
    this.profilePhoto.set("");
  }

  constructor(private userService: UserService, private router: Router){}
}
