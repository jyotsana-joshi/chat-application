import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RazorpayModule } from '@gautamsavaliya/test-razorpay';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { RealTimeChatComponent } from './realTimeChat.component';


const routes: Routes = [
  {
    path: '',
    component: RealTimeChatComponent,
    data: {
      title: 'RealTimeChat'
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
    SharedModule


  ],
  exports: [RouterModule],

  declarations: [RealTimeChatComponent]
})
export class RealTimeChatModule {
}
