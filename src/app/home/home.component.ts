import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showModal = true;
  
  close() {
    this.showModal = false;
  }

  openScheduleModal() {
    const loginModal = new bootstrap.Modal(document.getElementById('showtimeModal')!);
    loginModal.show();
  }

}
