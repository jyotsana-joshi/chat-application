import { CdkDragDrop, CdkDragEnter, CdkDragMove, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, ElementRef, Pipe, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent {
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
  showModal = false;
  public paymentId = null;
  public title = 'dropzone';

  public files: File[] = [];

  constructor(
    public router: Router,
    public authService: AuthService,
    public fb: FormBuilder,
    private cd: ChangeDetectorRef) {


  }


  ngOnInit(): void {


  }

  public onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  public onSelect(event: any) {
    this.files.push(...event.addedFiles);

    const formData = new FormData();

    for (var i = 0; i < this.files.length; i++) {
      formData.append("file[]", this.files[i]);
    }
  }

  public dragEntered(event: CdkDragEnter<any>) {
    const drag = event.item;
    const dropList = event.container;
    const dragIndex = drag.data;
    const dropIndex = dropList.data;

    this.dragDropInfo = { dragIndex, dropIndex };

    const phContainer = dropList.element.nativeElement;
    const phElement = phContainer.querySelector('.cdk-drag-placeholder');

    if (phElement) {
      phContainer.removeChild(phElement);
      phContainer.parentElement?.insertBefore(phElement, phContainer);
      moveItemInArray(this.files, dragIndex, dropIndex);

    }
  }

  public dragMoved(event: CdkDragMove<any>) {
    if (!this.dropListContainer || !this.dragDropInfo) {
      return;
    }

    const placeholderElement =
      this.dropListContainer.nativeElement.querySelector(
        '.cdk-drag-placeholder'
      );

    const receiverElement =
      this.dragDropInfo.dragIndex > this.dragDropInfo.dropIndex
        ? placeholderElement?.nextElementSibling
        : placeholderElement?.previousElementSibling;

    if (!receiverElement) {
      return;
    }

    receiverElement.style.display = 'none';
    this.dropListReceiverElement = receiverElement;
  }

  public dragDropped(event: CdkDragDrop<any>) {
    if (!this.dropListReceiverElement) {
      return;
    }
    this.dropListReceiverElement.style.removeProperty('display');

    this.dropListReceiverElement = undefined;

    this.dragDropInfo = undefined;
  }
}



