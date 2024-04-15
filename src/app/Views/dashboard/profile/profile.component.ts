import { Component, signal } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export default class ProfileComponent {
  profilePhoto = signal<string>("");
  msg: string = "";
  userInfo: any = {}

  ngOnInit(): void{
    this.userService.getUserInfo().subscribe(
      (response) =>{
        this.userInfo = response.data;
        this.profilePhoto.set(response.data.gender);
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
