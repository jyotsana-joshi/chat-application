
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent {

  public rowData: any = [];
  public columnDefs: any = []
  private items: any[] = [];
  public total: number = 0;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    public fb: FormBuilder) {
    this.activatedRoute.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadCart();
      }
    });

    this.columnDefs = [
      { headerName: 'ID', field: 'product.id' },
      { headerName: 'Name', field: 'product.name' },
      { headerName: 'Price', field: 'product.price' },
      { headerName: 'Quantity', field: 'quantity' },
      { headerName: 'Sub Total', field: 'subTotal' },
    ];
  }

  ngOnInit(): void {
  }

  private loadCart(): void {
    this.total = 0;
    this.items = [];
    let cart = JSON.parse(localStorage.getItem('cart')!);
    for (var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      this.items.push({
        product: item.product,
        quantity: item.quantity,
        subTotal: item.product.price * item.quantity
      });
      this.total += item.product.price * item.quantity;
    }
    this.rowData = this.items;

  }

}



