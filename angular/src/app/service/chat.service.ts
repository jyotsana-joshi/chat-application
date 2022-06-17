import { Injectable } from "@angular/core";
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ChatService {

    private socket = io('http://localhost:3000');

    public joinRoom(data: any) {
        this.socket.emit('join', data);
    }
    
    public createGroup(data: any) {
        this.socket.emit('createGroup', data);
    }

    public newUserJoined() {
        let observable = new Observable<any>((observer: any) => {
            this.socket.on('new-user-joined', (data:any) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });

        return observable;
    }

    public leaveRoom(data: any) {
        this.socket.emit('leave', data);
    }

    public userLeftRoom() {
        let observable = new Observable<any>((observer: any) => {
            this.socket.on('left room', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });

        return observable;
    }

    public sendMessage(data: any) {
        this.socket.emit('message', data);
    }

    public newMessageReceived() {
        let observable = new Observable<any>((observer: any) => {
            this.socket.on('new message', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });

        return observable;
    }
    public groupList() {
        let observable = new Observable<any>((observer: any) => {
            this.socket.on('group-list', (data) => {
                observer.next(data);
            });
            // return () => { this.socket.disconnect(); }
        });
        

        return observable;
    }
    public requestList() {
        let observable = new Observable<any>((observer: any) => {
            this.socket.on('requset-list', (data) => {
                observer.next(data);
            });
            // return () => { this.socket.disconnect(); }
        });
        return observable;

    }
}