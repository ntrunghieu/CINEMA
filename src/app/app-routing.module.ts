import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; 

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tickets/history', component: HomeComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes), ReactiveFormsModule 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
