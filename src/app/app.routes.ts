import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieDetailComponent } from './movie-management/movie-detail/movie-detail.component';
import { SeatsComponent } from './seats/seats.component';
import { RoomComponent } from './room/room.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { BillComponent } from './bill/bill.component';

export const routes: Routes = [
    {   path: '', component: HomeComponent },
    {
        path: 'first-component',
        component: RoomComponent,
    },
    {
        path: 'seat/:scheduleId/:roomId',
        component: SeatsComponent,
    },
    {
        path: 'bill',
        component: BillComponent,
    },
    {
        path: 'schedule/:id',
        component: ScheduleComponent,
    },
    {
        path: 'movie',
        loadChildren: () => import('./movie-management/movie-management.routes').then(m => m.MOVIE_ROUTES)
    },
];
