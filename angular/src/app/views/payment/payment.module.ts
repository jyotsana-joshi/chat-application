import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { RazorpayModule } from '@gautamsavaliya/test-razorpay';

import { PaymentComponent } from './payment.component';
import { NgxDropzoneModule } from 'ngx-dropzone';  
import { DragDropModule } from '@angular/cdk/drag-drop';

const routes: Routes = [
  {
    path: '',
    component: PaymentComponent,
    data: {
      title: 'Payment'
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
    NgxDropzoneModule,
    DragDropModule

  ],
  exports: [RouterModule],

  declarations: [PaymentComponent]
})
export class PaymentModule {
}
