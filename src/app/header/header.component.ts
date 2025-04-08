import { AfterContentInit, AfterViewInit, Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup  } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MovieManagementModule } from '../movie-management/movie-management.module';
import { MovieDetailComponent } from '../movie-management/movie-detail/movie-detail.component';
declare var bootstrap: any;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit {
  loginForm: FormGroup;
  showModal = true;



  constructor(private fb: FormBuilder, public authService: AuthService) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }
  ngAfterViewInit(): void {
    // Kiểm tra xem Bootstrap đã được tải chưa
    const loginElement = document.getElementById('loginModal');
    const registerElement = document.getElementById('registerModal');
    if (typeof bootstrap === 'undefined') {
      console.error('Bootstrap chưa được tải! Kiểm tra lại việc nhúng Bootstrap trong index.html');
    }
  }



  onSubmit() {
    this.authService.login(this.loginForm.value);
    this.close();
  }

  close() {
    this.showModal = false;
  }

  openLogin() {
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal')!);
    loginModal.show();
  }

  openRegister() {
    const registerModal = new bootstrap.Modal(document.getElementById('registerModal')!);
    registerModal.show();
  }
}
