import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BroadcasterService } from '../../../service/broadcaster.service';

@Component({
  templateUrl: './product-action.component.html'
})
export class ProductActionComponent implements OnInit {

  data: any;
  params: any;
  userData: any;

  constructor(
    public router: Router,
    public broadcast: BroadcasterService
  ) {
  }

  ngOnInit(): void {
  }

  agInit(params:any) {
    this.params = params;
    this.data = params.value;
  }

  action() {
    const row = this.params;
    this.broadcast.broadcast(`addToCart`, row.data);
  }

}
