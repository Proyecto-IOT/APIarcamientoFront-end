import { CommonModule } from '@angular/common';
import { Component, output, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { BreakpointObserver } from '@angular/cdk/layout'
import Swal from 'sweetalert2';
import { filter, map, mergeMap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export default class UserDashboardComponent {
  collapsed = signal<boolean>(false);
  profilePhoto = signal<string>('');
  hiddenPhoto = signal<boolean>(false);
  userInfo: any = {}

  readonly breakPoint$ = this.breakPointObserver.observe(`(max-width: 500px)`);
  
  ngOnInit(): void{
    this.obtenerNomRuta();
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

  abrirSideNav(collapsed: boolean){
    this.collapsed.set(true);
  }

  cerrarSideNav(collapsed: boolean){
    this.collapsed.set(false);
  }

  logout(){
    this.userService.logout().subscribe(
      (response) =>{
        this.cookies.delete('token');
        this.router.navigate(['/login']);
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

  constructor(private userService: UserService, private router: Router, 
    private cookies: CookieService, private breakPointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute, public titleService: Title,){
      this.breakPoint$.subscribe(() => this.breakpointChanges())
    }

    breakpointChanges(): void{
      if(this.breakPointObserver.isMatched(`(max-width: 500px)`)){
        this.hiddenPhoto.set(true);
      }else{
        this.hiddenPhoto.set(false);
      }
    }

    obtenerNomRuta() {
      this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          map(() => this.activatedRoute),
          map((route) => {
            while (route.firstChild) {
              route = route.firstChild;
            }
            return route;
          }),
          filter((route) => route.outlet === 'primary'),
          mergeMap((route) => route.data)
        )
        .subscribe((event) => {
          const pageTitle = event['title'];
          if (pageTitle) {
            this.titleService.setTitle(pageTitle);
          }
        });
    }

    
}
