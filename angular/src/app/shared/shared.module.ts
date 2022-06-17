import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  GreedTableModule,
  UiModalModule
} from './component';


@NgModule({
  imports: [
    CommonModule,
    GreedTableModule,
    UiModalModule
  ],
  exports: [
    CommonModule,
    GreedTableModule,
    UiModalModule

  ],
  declarations: [],
  providers: []
})
export class SharedModule { }
