import { Component, Pipe } from '@angular/core';
import { AbstractControl, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Router,
} from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public form!: FormGroup;   
  private user:any = [];
  constructor(private formBuilder: FormBuilder,  
    public router: Router, 
    public authService: AuthService) 
  {
     this.user = localStorage.getItem("user");
     this.user = JSON.parse(this.user); 

   }

  get f(){
    return this.form.controls;
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      number: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  public login() {
    if(this.form.valid) {
    
      this.authService.login(this.form.value).subscribe((res)=>{
        if(res.token){
          this.router.navigate(['dashboard']);
        }
      })
    }
  }
}
