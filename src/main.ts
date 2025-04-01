import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter, RouterModule, RouterOutlet } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MovieDetailComponent } from './app/movie-management/movie-detail/movie-detail.component';
import { HomeComponent } from './app/home/home.component';
import { MovieManagementModule } from './app/movie-management/movie-management.module';
import { SeatsComponent } from './app/seats/seats.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
