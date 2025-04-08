import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-bill',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.css'
})
export class BillComponent implements OnInit {
  billId: string = '';
  paymentDate: string = '';
  paymentTime: string = '';
  paymentMethod: string = 'PayPal';
  movieInfo = {
    title: '',
    date: '',
    time: '',
    room: ''
  };
  selectedSeats: string[] = [];
  totalAmount: number = 0;

  ngOnInit() {
    this.generateBillId();
    this.setCurrentDateTime();
    this.loadPaymentData();
  }

  private generateBillId() {
    // Generate a unique bill ID: HD + current timestamp
    const timestamp = new Date().getTime();
    this.billId = `HD${timestamp}`;
  }

  private setCurrentDateTime() {
    const now = new Date();
    // Format date as DD/MM/YYYY
    this.paymentDate = now.toLocaleDateString('vi-VN');
    // Format time as HH:mm:ss
    this.paymentTime = now.toLocaleTimeString('vi-VN');
  }

  private loadPaymentData() {
    const billData = localStorage.getItem('billData');
    if (billData) {
      const data = JSON.parse(billData);
      this.movieInfo = data.movieInfo;
      this.selectedSeats = data.selectedSeats;
      this.totalAmount = data.totalAmount;
      // Clear the data after loading
      localStorage.removeItem('billData');
    }
  }
}
