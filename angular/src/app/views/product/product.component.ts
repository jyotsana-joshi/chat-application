
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { ProductActionComponent } from '../product/product-action/product-action.component';
import { BroadcasterService } from '../../service/broadcaster.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  private subscription: Subscription[] = [];

  public rowData: any = [];
  public columnDefs: any = []

  constructor(
    public router: Router,
    public broadcasterService: BroadcasterService,
    public authService: AuthService,
    public fb: FormBuilder) {

    this.columnDefs = [
      { headerName: 'ID', field: 'id' },
      { headerName: 'Name', field: 'name' },
      { headerName: 'Price', field: 'price' },
      {
        headerName: 'Actions', sortable: false, suppressMenu: true, cellRendererFramework: ProductActionComponent, autoHeight: true
      }
    ];
  }


  ngOnInit(): void {
    this.rowData = this.authService.productfindAll();


    this.listen();
  }
  ngOnDestroy() {
    this.subscription.forEach(s => s.unsubscribe());
  }

  private listen() {
    this.subscription.push(this.broadcasterService.on('addToCart').subscribe((response: any) => {
      if (response.id) {
        const item: any = {
          product: this.authService.find(response.id),
          quantity: 1
        };
        if (localStorage.getItem('cart') == null) {
          let cart: any = [];
          cart.push(JSON.stringify(item));
          localStorage.setItem('cart', JSON.stringify(cart));
        } else {
          let cart: any = JSON.parse(localStorage.getItem('cart')!);
          let index: number = -1;
          for (var i = 0; i < cart.length; i++) {
            let item: any = JSON.parse(cart[i]);
            if (item.product.id == response.id) {
              index = i;
              break;
            }
          }
          if (index == -1) {
            cart.push(JSON.stringify(item));
            localStorage.setItem('cart', JSON.stringify(cart));
          } else {
            let items: any = JSON.parse(cart[index]);
            items.quantity += 1;
            cart[index] = JSON.stringify(items);
            localStorage.setItem("cart", JSON.stringify(cart));
          }
        }
      }
      this.router.navigate(['/product/cart/'], { queryParams: { id: response.id } });

    }));

  }

}

