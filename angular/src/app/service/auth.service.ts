import { Inject, Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, ReplaySubject, forkJoin } from 'rxjs';
import { DOCUMENT } from '@angular/common';

import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  currentUserSubject: any;
  public currentUser: Observable<any>;
  private Base_Url = "http://localhost:4000"
  private _loadedLibraries: { [url: string]: ReplaySubject<any> } = {};
  private products: any[];

  constructor(
    // public afAuth: AngularFireAuth,
    @Inject(DOCUMENT) private readonly document: any,
    public router: Router,
    private http: HttpClient,
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
    this.products = [
      { id: 'p01', name: 'name 1', price: 100, photo: '' },
      { id: 'p02', name: 'name 2', price: 200, photo: '' },
      { id: 'p03', name: 'name 3', price: 300, photo: '' }
  ];
  }

  lazyLoadLibrary(resourceURL: any): Observable<any> {
    return forkJoin([
        this.loadScript(resourceURL)
    ]);
} 

public getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser")!);

}

private loadScript(url: string): Observable<any> {
  if (this._loadedLibraries[url]) {
      return this._loadedLibraries[url].asObservable();
  }

  this._loadedLibraries[url] = new ReplaySubject();

  const script = this.document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = url;
  script.onload = () => {
      this._loadedLibraries[url].next(url);
      this._loadedLibraries[url].complete();
  };

  this.document.body.appendChild(script);    
  return this._loadedLibraries[url].asObservable();
}    


  public get isLoggedIn(): any {
    return this.currentUserSubject.value;
  }

  login(form: any): Observable<any> {
    return this.http.post(`${this.Base_Url}/api/login`, {
      ...form,
    }).pipe(map(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));

  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.Base_Url}/api/forgotPassword`, {
      email,
    });
  }

  resetPassword(form: any): Observable<any> {
    return this.http.post(`${this.Base_Url}/api/resetPassword`, {
      ...form,
    });
  }

  register(form: any): Observable<any> {
    return this.http.post(`${this.Base_Url}/api/register`, {
      ...form,
    });
  }
  getuser(form: any): Observable<any> {
    return this.http.post(`${this.Base_Url}/api/getUser`, {
      ...form,
    });
  }

  post(data: any, method: any): Observable<any> {
    return this.http.post(`${this.Base_Url}/api/${method}`, {
      ...data,
    });
  }

  
  findAll(endPoint: any, params?: any): Observable<any> {
    return this.http.post(`${this.Base_Url}/api/${endPoint}`, {
      ...params
    });
  }

  public findById(endPoint: string, id: any): Observable<any> {

    const url = `${this.Base_Url}/api/${endPoint}`;
    // console.log(url);
    return this.http.get(url + '/' + id)
  }

  public postFile(endPoint: string, data: any, attachmentName: Array<string>): Observable<any> {
    let formData = new FormData();
    formData = new FormData();
    for (const i in data) {
      if (attachmentName.indexOf(i) > -1) {
        console.log(data[i]);

        for (let j = 0; j < data[i].length; j++) {
          formData.append(i, data[i][j]);
        }
      } else {
        formData.append(i, data[i]);
      }
    }
    const url = `${this.Base_Url}/api/${endPoint}`;
    console.log('formData', formData);
    return this.http.post(url, formData)
      
  }



    productfindAll(): any[] {
        return this.products;
    }

    find(id: string): any {
        return this.products[this.getSelectedIndex(id)];
    }

    private getSelectedIndex(id: string) {
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].id == id) {
                return i;
            }
        }
        return -1;
    }



}


