import { Component, Input, OnInit, ViewEncapsulation, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-ui-modal',
  templateUrl: './ui-modal.component.html',
  styleUrls: ['./ui-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UiModalComponent implements OnInit {

  @Input() hideHeader = false;
  @Input() hideFooter = false;
  @Input() hideCloseBtn = false;
  @Input() footerFixed = false;
  @Input() modalCloseOnOutsideClick = false;

  @Input()
  headerTitle!: string;
  @Input() modalSize = 'lg'; // xxl|xl|lg|''
  @Output() afterClose = new EventEmitter();

  @ViewChild('template', { static: false }) template: any;

  private modalRef!: BsModalRef;
  private config: ModalOptions = {
    ignoreBackdropClick: true,
    keyboard: false,
    class: 'modal-lg'
  };

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  public show(): void {
    // this.config.ignoreBackdropClick = !this.modalCloseOnOutsideClick;
    // console.log(this.modalCloseOnOutsideClick);
    this.config.class = `modal-${this.modalSize}`;
    this.modalRef = this.modalService.show(this.template, this.config);
  }

  public hide(): void {
    this.modalRef.hide();
    this.afterClose.emit();
  }
}
