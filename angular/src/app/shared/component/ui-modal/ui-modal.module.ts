import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

import { UiModalComponent } from './ui-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  declarations: [
    UiModalComponent
  ],
  exports: [
    UiModalComponent
  ]
})
export class UiModalModule { }
