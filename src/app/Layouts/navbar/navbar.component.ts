import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  mostrarNavbar: boolean = true;
  token: string | null = null;
  name = signal<string>("");
  userInfo: any = {};
  hidde = signal<boolean>(false);

  ngOnInit(): void{
    this.userService.getUserInfo().subscribe(
      (response) =>{
        if(response.result){
          this.hidde.set(true);
          this.name.set(response.data.name);
        }
      },
      (error) =>{
        this.hidde.set(false);
        console.error('No se recibieron datos');
      }
    )
  }

  constructor(private router: Router, public userService: UserService, private cookies: CookieService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.mostrarNavbar = !['/login', '/sign-Up', '/authcode', '/dashboard', '/login/AuthCode'].includes(
          event.url
        ) && !event.url.startsWith('/dashboard/');
      }
    });
  }

  logout(){
    this.userService.logout().subscribe(
      (response) =>{
        this.router.navigate(['/login']);
        this.cookies.delete('token');
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
