import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private baseUrl = 'http://localhost:8080/api'; // Điều chỉnh URL backend của bạn

  constructor(private http: HttpClient) { }

  getAvailableSeats(scheduleId: number, roomId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/schedules/${scheduleId}/rooms/${roomId}/available-seats`);
  }
}
