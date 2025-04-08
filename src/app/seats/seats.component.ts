import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-seats',
  standalone: true,
  imports: [HeaderComponent, RouterModule, CommonModule],
  templateUrl: './seats.component.html',
  styleUrl: './seats.component.css'
})
export class SeatsComponent implements OnInit {
  scheduleId: number;
  roomId: number;
  selectedSeats: string[] = [];
  bookedSeats: string[] = [];
  totalPrice: number = 0;
  readonly SEAT_PRICE = 75000; // Giá mỗi ghế
  readonly MAX_SEATS = 8; // Số ghế tối đa được chọn

  constructor(private route: ActivatedRoute, private scheduleService: ScheduleService) {
    this.scheduleId = Number(this.route.snapshot.params['scheduleId']);
    this.roomId = Number(this.route.snapshot.params['roomId']);
  }

  ngOnInit() {
    // Test data: Thêm một số ghế đã đặt để test
    this.bookedSeats = ['A1', 'A2', 'B5', 'C7', 'D10', 'E3', 'F8', 'G2'];
    this.updateSeatStatus();
  }



  toggleSeatSelection(seatId: string, event: MouseEvent) {
    const element = event.target as HTMLElement;
    
    // Kiểm tra nếu ghế đã được đặt
    if (this.bookedSeats.includes(seatId)) {
      alert('Ghế này đã được đặt!');
      return;
    }

    const seatIndex = this.selectedSeats.indexOf(seatId);
    if (seatIndex === -1) {
      // Kiểm tra số lượng ghế tối đa
      if (this.selectedSeats.length >= this.MAX_SEATS) {
        alert(`Bạn chỉ được chọn tối đa ${this.MAX_SEATS} ghế!`);
        return;
      }
      // Thêm ghế vào danh sách đã chọn
      this.selectedSeats.push(seatId);
      element.classList.remove('available');
      element.classList.add('selected');
    } else {
      // Bỏ chọn ghế
      this.selectedSeats.splice(seatIndex, 1);
      element.classList.remove('selected');
      element.classList.add('available');
    }

    // Sắp xếp lại danh sách ghế đã chọn
    this.selectedSeats.sort();

    // Cập nhật tổng tiền
    this.totalPrice = this.selectedSeats.length * this.SEAT_PRICE;
  }

  private updateSeatStatus() {
    // Cập nhật trạng thái ghế đã đặt trong giao diện
    this.bookedSeats.forEach(seatId => {
      const seatElement = document.querySelector(`[data-seat="${seatId}"]`);
      if (seatElement) {
        seatElement.classList.remove('available');
        seatElement.classList.add('booked');
      }
    });
  }
}
