import { CdkDragDrop, CdkDragEnter, CdkDragMove, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, ElementRef, Pipe, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CalendarOptions } from '@fullcalendar/angular';
@Component({
  selector: 'app-fullCalender',
  templateUrl: './fullCalender.component.html',
  styleUrls: ['./fullCalender.component.scss']
})
export class FullCalenderComponent {
  @ViewChild('uiAddEventModal', { static: false }) uiAddEventModal: any;
public IsOptions = true
  public event = '';
  public date:any;
  private events = [
    {
      title: 'event 1', start: '2022-06-15', // a property!
      end: '2022-06-17'
    },
    { title: 'event 2', date: '2022-06-02' }
  ];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    editable: true,

    events: this.events,
    dateClick: this.handleDateClick.bind(this),


    eventDragStop: (eventDragStopEvent) => {
      console.log(eventDragStopEvent.event.end);
    },
    droppable: true,

  };

  constructor(
    public router: Router,
    public authService: AuthService,
    public fb: FormBuilder,
    private cd: ChangeDetectorRef) {

  }


  ngOnInit(): void {


  }
  public handleDateClick(arg: any) {
    console.log('arg', arg)
    this.date = arg.dateStr
    this.IsOptions =false;
    this.uiAddEventModal.show()

  }


   public submit(){
     const obj = {title:this.event, date:this.date}
     this.events.push(obj);
     console.log('this.events', this.events);
     this.uiAddEventModal.hide();
     this.IsOptions =true;

   }
   public afterCloseModal() {

  }
}



