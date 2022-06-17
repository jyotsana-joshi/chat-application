import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Router,
} from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public form!: FormGroup;
  public imageSrc!: string;
  public image!: string;
  constructor(private formBuilder: FormBuilder,
    public router: Router,
    public authService: AuthService) {

  }

  get f() {
    return this.form.controls;
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      fullname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      number: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
      rePassword: new FormControl('', Validators.required),
      file: new FormControl('', Validators.required)
    });
  }

  public onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [image] = event.target.files;
      this.imageSrc = image;
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.image = reader.result as string;
      };
    }
  }

  public submit() {
    if (this.form.valid) {
      const value = this.form.value
   if (this.imageSrc) {
        value.image = [this.imageSrc];
      }
      if (value.password == value.rePassword) {
        this.authService.postFile('register', value, ['image']).subscribe(res => {
          if (res) {
            this.router.navigate(['login']);
          }
        })
      }

    }
  }
}
