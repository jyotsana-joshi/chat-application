
import { ChangeDetectorRef, Component, ElementRef, Pipe, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Router,
} from '@angular/router';

import { AuthService } from '../../service/auth.service';
declare let Razorpay: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  @ViewChild('dropListContainer') dropListContainer?: ElementRef;
  dropListReceiverElement?: HTMLElement;
  dragDropInfo?: {
    dragIndex: number;
    dropIndex: number;
  };
  public customStripeForm!: FormGroup;
  private user: any = [];
  public formProcess = false;
  public submitted = false;
  public success: boolean = false;
  public failure: boolean = false;
  public paymentHandler: any = null;
  public response: any;
  public razorpayResponse: any;
  public pymentId: any;
  public paymentId = null;

  files: File[] = [];
  public option: any = {
    "key": "rzp_test_V96wpIY3qLs4zo",
    "amount": 10000,
    "name": "Novopay",
    "order_id": "",
    "description": "Load Wallet",
    "image": "https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg",
    "prefill": {
      "name": "",
      "email": "test@test.com",
      "contact": "",
      "method": ""
    },
    "modal": {},
    "theme": {
      "color": "#0096C5"
    }
  };
  constructor(
    public router: Router,
    public authService: AuthService,
    public fb: FormBuilder,
    private cd: ChangeDetectorRef) {
    this.user = localStorage.getItem("user");
    this.user = JSON.parse(this.user);

  }


  ngOnInit(): void {
    this.invokeStripe();
    this.authService
      .lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js')
      .subscribe(res => {
      });

  }

  public makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51L6AcuSGzq7ss3OqogTH26bgRKO8Y5k1OxtjP8vVLBbOQxFIt3ldQVPC7ZU1l4fyu2FZSWbxuwCrdu7sxplV8ldz00EewnNtYa',
      locale: 'auto',
      token: function (stripeToken: any) {
        paymentStripe(stripeToken);

      },
    })
    const paymentStripe = (stripeToken: any) => {
      console.log('stripeToken', stripeToken);
      this.authService.post(stripeToken, 'checkout').subscribe((data: any) => {
        console.log(data);
        if (data.data === "success") {
          this.success = true
        }
        else {
          this.failure = true
        }
      });
    };

    paymentHandler.open({
      name: 'gautam',
      description: 'watch',
      amount: amount * 100,
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51L6AcuSGzq7ss3OqogTH26bgRKO8Y5k1OxtjP8vVLBbOQxFIt3ldQVPC7ZU1l4fyu2FZSWbxuwCrdu7sxplV8ldz00EewnNtYa',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
          },
        });
      };

      window.document.body.appendChild(script);
    }
  }

  public refund() {
    this.authService.post(this.pymentId, 'refundPayment').subscribe(res => {
      console.log('res', res);
    })
  }

  public output(event: any) {
    console.log(event)
  }

}



