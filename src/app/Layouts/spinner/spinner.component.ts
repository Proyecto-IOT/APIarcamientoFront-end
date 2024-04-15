import { Component, inject } from '@angular/core';
import { SpinnerService } from '../../core/services/spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export default class SpinnerComponent {
  private readonly spinnerServ = inject(SpinnerService);
  isLoading = this.spinnerServ.isLoading;
}
