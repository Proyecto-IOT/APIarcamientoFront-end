import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css'
})
export default class AlertsComponent {
  hiddenPhoto = signal<boolean>(false);

  readonly breakPoint$ = this.breakPointObserver.observe(`(max-width: 500px)`);

  constructor(private breakPointObserver: BreakpointObserver, private router: Router){
    this.breakPoint$.subscribe(() => this.breakpointChanges())
  }

  breakpointChanges(): void{
    if(this.breakPointObserver.isMatched(`(max-width: 500px)`)){
      this.hiddenPhoto.set(true);
    }else{
      this.hiddenPhoto.set(false);
    }
  }

}
