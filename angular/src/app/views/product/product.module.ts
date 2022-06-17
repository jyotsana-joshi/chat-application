import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RazorpayModule } from '@gautamsavaliya/test-razorpay';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './product.component';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from '../../shared/shared.module';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    data: {
      title: 'ProductList'
    }
  },
  {
    path: 'cart',
    component: CartComponent,
    data: {
      title: 'CartList'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    RazorpayModule,
    ReactiveFormsModule,
    FormsModule,
    AgGridModule,
    SharedModule,

  ],
  exports: [RouterModule],

  declarations: [ProductComponent, CartComponent],

})
export class ProductModule {
}
