import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-seats',
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  templateUrl: './seats.component.html',
  styleUrl: './seats.component.css'
})
export class SeatsComponent implements OnInit {
  selectedSeats: string[] = [];
  totalAmount: number = 0;
  seatPrice: number = 75000; // Giá vé thường
  coupleSeatPrice: number = 150000; // Giá ghế đôi

  constructor(private router: Router) {}

  ngOnInit() {
    this.initializeSeatSelection();
    this.restoreSelectedSeats();
  }

  private initializeSeatSelection() {
    const seatMap = document.getElementById('seatMap');
    if (seatMap) {
      seatMap.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (target.tagName === 'TD' && !target.classList.contains('booked')) {
          this.toggleSeatSelection(target);
        }
      });
    }
  }

  private restoreSelectedSeats() {
    // Check if there are selected seats to restore
    const savedData = localStorage.getItem('selectedSeatsData');
    if (savedData) {
      const data = JSON.parse(savedData);
      this.selectedSeats = data.selectedSeats;
      this.totalAmount = data.totalAmount;

      // Restore visual selection
      setTimeout(() => {
        this.selectedSeats.forEach(seatId => {
          const seatElement = document.querySelector(`[data-seat="${seatId}"]`) as HTMLElement;
          if (seatElement && !seatElement.classList.contains('booked')) {
            seatElement.classList.add('selected');
          }
        });
        this.updateSeatInfo();
      });

      // Clear the saved data after restoring
      localStorage.removeItem('selectedSeatsData');
    }
  }

  private toggleSeatSelection(seatElement: HTMLElement) {
    const seatId = seatElement.getAttribute('data-seat');
    if (!seatId) return;

    if (seatElement.classList.contains('selected')) {
      // Bỏ chọn ghế
      seatElement.classList.remove('selected');
      this.selectedSeats = this.selectedSeats.filter(id => id !== seatId);
      this.totalAmount -= this.getSeatPrice(seatElement);
    } else {
      // Chọn ghế
      seatElement.classList.add('selected');
      this.selectedSeats.push(seatId);
      this.totalAmount += this.getSeatPrice(seatElement);
    }

    this.updateSeatInfo();
  }

  private getSeatPrice(seatElement: HTMLElement): number {
    return seatElement.classList.contains('couple') ? this.coupleSeatPrice : this.seatPrice;
  }

  private updateSeatInfo() {
    // Cập nhật thông tin ghế và tổng tiền
    const seatInfoElement = document.querySelector('.movie-info p:nth-child(6)');
    const totalAmountElement = document.querySelector('.movie-info p:nth-child(8)');
    
    if (seatInfoElement) {
      seatInfoElement.innerHTML = `<strong>Vị trí ghế:</strong> ${this.selectedSeats.join(', ') || 'Chưa chọn'}`;
    }
    
    if (totalAmountElement) {
      totalAmountElement.innerHTML = `<strong>Tổng tiền:</strong> ${this.totalAmount.toLocaleString('vi-VN')} VNĐ`;
    }

    const numberOfSeatsElement = document.querySelector('.movie-info p:nth-child(7)');
    if (numberOfSeatsElement) {
      numberOfSeatsElement.innerHTML = `<strong>Số ghế:</strong> ${this.selectedSeats.length}`;
    }
  }

  continueToPayment() {
    if (this.selectedSeats.length === 0) {
      alert('Vui lòng chọn ít nhất một ghế!');
      return;
    }

    // Save data to localStorage
    const paymentData = {
      selectedSeats: this.selectedSeats,
      totalAmount: this.totalAmount,
      movieInfo: {
        title: 'KÍNH VẠN HOA (T16)',
        date: '02/04/2025',
        time: '13:20 - 15:17',
        room: '02'
      }
    };
    localStorage.setItem('paymentData', JSON.stringify(paymentData));

    // Navigate to payment page
    this.router.navigate(['/payment']);
  }
}