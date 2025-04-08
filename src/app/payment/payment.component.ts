import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

declare let paypal: any;

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  selectedSeats: string[] = [];
  totalAmount: number = 0;
  movieInfo = {
    title: '',
    date: '',
    time: '',
    room: ''
  };
  private paypalInitialized = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Retrieve data from localStorage
    const paymentData = localStorage.getItem('paymentData');
    if (paymentData) {
      const data = JSON.parse(paymentData);
      this.selectedSeats = data.selectedSeats;
      this.totalAmount = data.totalAmount;
      this.movieInfo = data.movieInfo;
    }

    // Load PayPal script
    this.loadPayPalScript();
  }

  private loadPayPalScript(): Promise<void> {
    return new Promise((resolve) => {
      if (this.paypalInitialized) {
        resolve();
        return;
      }
      // PayPal SDK is already loaded in index.html
      this.paypalInitialized = true;
      this.initPayPal();
      resolve();
    });
  }

  private initPayPal() {
    paypal.Buttons({
      fundingSource: paypal.FUNDING.PAYPAL,
      style: {
        layout: 'vertical',
        color: 'blue',
        shape: 'rect',
        label: 'paypal',
        height: 45
      },
      createOrder: (data: any, actions: any) => {
        const usdAmount = (this.totalAmount / 23000).toFixed(2); // Convert VND to USD (approximate)
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: usdAmount,
              currency_code: 'USD'
            },
            description: `Vé xem phim - ${this.movieInfo.title} - Ghế: ${this.selectedSeats.join(', ')}`
          }]
        });
      },
      onApprove: async (data: any, actions: any) => {
        try {
          const details = await actions.order.capture();
          console.log('Payment completed successfully', details);
          // Save bill data before navigating
          const billData = {
            movieInfo: this.movieInfo,
            selectedSeats: this.selectedSeats,
            totalAmount: this.totalAmount
          };
          localStorage.setItem('billData', JSON.stringify(billData));
          localStorage.removeItem('paymentData');
          
          alert('Thanh toán thành công!');
          this.router.navigate(['/bill']);
        } catch (error) {
          console.error('Payment capture failed:', error);
          alert('Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.');
        }
      },
      onError: (err: any) => {
        console.error('PayPal Error:', err);
        alert('Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.');
      },
      onCancel: () => {
        console.log('Payment cancelled');
        alert('Bạn đã hủy thanh toán.');
      }
    }).render('#paypal-button-container');
  }

  startPayPalPayment() {
    const container = document.getElementById('paypal-button-container');
    if (container) {
      container.style.display = 'block';
      if (!this.paypalInitialized) {
        this.loadPayPalScript().then(() => {
          // PayPal button will be rendered automatically after script loads
        });
      }
    }
  }


}