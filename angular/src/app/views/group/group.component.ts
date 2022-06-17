
import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductActionComponent } from '../product/product-action/product-action.component';
import { BroadcasterService } from '../../service/broadcaster.service';
import { AbstractControl, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ChatService } from '../../service/chat.service';

import { Observable, map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {
  @ViewChild('uiModal', { static: false }) uiModal: any;

  public form!: FormGroup;
  public submitted = false;
  public courses!: Observable<any>;
  public pleaseWait = false
  public errorMsg=null;
  private subscription: Subscription[] = [];

  public rowData: any = [];
  public columnDefs: any = []
 public currentUser:any 
  constructor(
    public router: Router,
    public broadcasterService: BroadcasterService,
    public authService: AuthService,
    public fb: FormBuilder,
    public chatService:ChatService) {
      this.currentUser = this.authService.getCurrentUser()

    this.columnDefs = [
      { headerName: 'Group Name', field: 'groupName' },
      { headerName: 'Status', field: 'status' , cellRenderer: (params:any) => {
        // put the value in bold
        return  (params.value==1)? 'Active' : 'InActice'
    }
},
      // {
      //   headerName: 'Actions', sortable: false, suppressMenu: true, cellRendererFramework: ProductActionComponent, autoHeight: true
      // }
    ];
  }

  get f() { return this.form.controls; }

  ngOnInit(): void {

    this.load()
    this.listen();
    this.buildForm();

  }
  ngOnDestroy() {
    this.subscription.forEach(s => s.unsubscribe());
  }

  private buildForm() {
    this.form = this.fb.group({
      groupName: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }

  public load() {
    this.authService.findAll('group-list').subscribe((res) => {
      this.rowData=res
    })
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

  public save(){
    this.submitted = true;
    if (this.form.valid) {
      this.pleaseWait = true;    
      const value = this.form.value; 
      value.user = this.currentUser.fullname
      this.authService.post(value, 'add-group').subscribe((res)=>{
   
        this.pleaseWait = false;
        this.createGroup(value.groupName)
        this.uiModal.hide();
        this.load();
      }, (error: HttpErrorResponse) => {
        this.pleaseWait = false;
        const err = error.error;
        this.errorMsg = err.error;
      });
    }
  }

  public createGroup(group:any) {
    this.chatService.joinRoom({ user: this.currentUser.fullname, room:group, role:this.currentUser.role});
  }
  
  public afterCloseModal(): void {
    this.form.reset();
    this.submitted = false;
    this.errorMsg = null;
  }
}

