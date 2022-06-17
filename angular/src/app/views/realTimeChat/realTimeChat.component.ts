import { ChangeDetectorRef, Component, ElementRef, HostListener, Pipe, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { io } from 'socket.io-client';
import { ChatService } from '../../service/chat.service';
import * as $ from 'jquery';
import * as _ from 'lodash';

@Component({
  selector: 'app-realTimeChat',
  templateUrl: './realTimeChat.component.html',
  styleUrls: ['./realTimeChat.component.scss']
})
export class RealTimeChatComponent {
  @ViewChild('massgeList', { static: true }) public massgeList: any;
  @ViewChild('uiModal', { static: false }) uiModal: any;
  @ViewChild('uiRequsetModal', { static: false }) uiRequsetModal: any;
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  @ViewChild('uiUserRequsetModal', { static: false }) uiUserRequsetModal: any;

  
  public groups: any = [];
  public userList: any = [];
  public serchList:any = [];
  public searchUserId:any
  public requsetUserList: any = [];
  public socket: any
  public channel: any;
  public groupId: any;
  public requstUserId: any;
  public isRequestAccept = false;
  public id: any;
  public searchText = ''
  public username: any;
  public message: any;
  public htmlToAdd: any;
  public user: any = '';
  public activeGroup: any = '';
  public messageText: any = '';
  public file: any = ''
  public currentUser: any
  public requstdUser: any
  public currentGroup: any
  public joinGroup: any = [];
  messageArray: any = [];
  public isOpenUserList = false;
  constructor(
    public router: Router,
    public authService: AuthService,
    public fb: FormBuilder,
    private cd: ChangeDetectorRef, private chatService: ChatService) {
    this.currentUser = this.authService.getCurrentUser()

    this.chatService.newUserJoined()
      .subscribe((data: any) => {
        console.log('newUserJoined', data)
        this.messageArray.push(data)
      });

    this.chatService.groupList()
      .subscribe((data: any) => {
        this.groups = data;
      });
    this.chatService.requestList()
      .subscribe((data: any) => {
        console.log('requestList', data);
        if (this.currentUser.fullname == data.user) {
          this.joinGroup.splice(0, 0, data);

        }
      });
    this.chatService.userLeftRoom()
      .subscribe((data: any) => this.messageArray.push(data));

    this.chatService.newMessageReceived()
      .subscribe((data: any) => {
        console.log('newMessageReceived', data);
        this.messageArray.push(data)
      });

  }


  ngOnInit(): void {
    $('#action_menu_btn').click(function () {
      $('.action_menu').toggle();
    });
    this.scrollToBottom();

    if (this.currentUser.role == 'superAdmin') {
      this.load();
    }

    if (this.currentUser.role == 'user') {
      this.requstGroupList();
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
  public load() {

    this.authService.findAll('group-list').subscribe((res) => {
      this.groups = res

    })
  }
  public search() {
    const value = { name: this.searchText }
    if(this.searchText){
      this.authService.post(value, 'search').subscribe(res => {
        this.serchList = res;
      
    })
    }else{
      this.serchList = [];
    }
   
  }
  onChangeSearchUser(searchUser:any){
    console.log('searchUser', searchUser);
    this.searchUserId = searchUser.id;
    for (const item of this.serchList) {
      if (item.fullname === searchUser.fullname) {
        item.active = true;
      } else {
        item.active = false;

      }
    }
    this.uiUserRequsetModal.show();
  }

  public requstGroupList() {
    const obj = {
      user: this.currentUser.fullname
    }
    this.authService.findAll('request-group-list', obj).subscribe((res) => {
      this.joinGroup = res
      console.log(this.joinGroup);
    })
  }

  public addToGroup() {
    this.isOpenUserList = !this.isOpenUserList
    this.userList = [];
    this.authService.findAll('user-list').subscribe(res => {
      for (const item of res) {
        if (!([this.currentUser.fullname].includes(item.fullname)) && (item.role !== 'superAdmin')) {
          this.userList.push(item);
        }
      }
    });
  }

  public onChangeGroup(group: any) {
    if (this.currentUser.role == 'user') {
      this.groupId = group.groupId;

    } else {
      this.groupId = group.id;

    }
    this.activeGroup = group.groupName
    for (const item of this.groups) {
      if (item.groupName === group.groupName) {
        item.active = true;
      } else {
        item.active = false;

      }
    }
    this.authService.findById('previous-group-chat', this.groupId).subscribe((res) => {
      if (res) {

        const data = res.previousChat

        const msgList = JSON.parse(data)

        this.messageArray = msgList;
      }

    })

    if (this.currentUser.role == 'user' && this.activeGroup) {
      for (const item of this.joinGroup) {
        if (item.groupName === group.groupName) {
          item.active = true;
        } else {
          item.active = false;

        }
      }
      this.currentGroup = _.find(this.joinGroup, { groupName: this.activeGroup })
    }
  }

  public request() {
    const obj = {
      groupId: this.groupId,
      user: this.requstdUser,
      
    }
    this.authService.post(obj, 'requsetUser').subscribe(res => {
      this.uiModal.hide();

    })
  }

  public requestUser(){
    const obj = {
      reciverId: this.searchUserId,
      senderId: this.currentUser.userId,
      
    }
    this.authService.post(obj, 'requset-single-user').subscribe(res => {
      this.uiModal.hide();

    })
  }

  public requestAccept() {
    this.authService.findById('requst-accept', this.currentGroup.id).subscribe((res) => {
      if (res.status == 'success') {
        this.currentGroup.isRequest = true
        this.chatService.joinRoom({ user: this.currentUser.fullname, room: this.activeGroup });
        console.log('this.currentGroup', this.currentGroup);
      }
    })
  }


  public onChangeUser(user: any) {
    for (const item of this.userList) {
      if (item.fullname === user.fullname) {
        item.active = true;
      } else {
        item.active = false;

      }
    }

    const obj = {
      groupId: this.groupId,
      user: user.fullname
    }
    this.requstdUser = user.fullname
    this.authService.post(obj, 'group-user').subscribe(res => {
      if (res && res.length > 0) {
        if (res[0].isRequest == false)
          this.uiModal.show();
      } else if (res && res.length == 0) {
        this.uiModal.show();
      }
    })
  }

  public onFileChange(event: any) {

    if (event.target.files.length > 0) {
      this.file = event.target.files[0];

    }
  }

  public sendMessage() {
    let data: any = { user: this.currentUser.fullname, message: this.messageText }
    data.room = this.activeGroup
    if (this.activeGroup) {
      if (this.file) {
        var reader = new FileReader();
        reader.onload = (evt) => {
          data.file = evt.target?.result;
          data.fileName = this.file.name;
          this.chatService.sendMessage(data);

        };
        reader.readAsDataURL(this.file);
      } else {
        this.chatService.sendMessage(data);
      }
    }

    this.messageText = ''
  }



  public afterCloseModal(): void {

  }
}



