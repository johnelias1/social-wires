import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service';
import { AppComponent } from 'src/app/app.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form!: FormGroup;

  public error?: string = '';

  constructor(
    public router: Router,
    private usersService: UsersService,
    public appComponent: AppComponent
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})')
        ),
      ]),
      fullname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  signup(form: any) {
    if (!form.valid) return;

    this.usersService.signup(form.value).subscribe(
      () => {
        return this.router.navigate(['']);
      },
      (error) => {
        this.error = error?.error?.message || 'Something went wrong';
      }
    );
  }

  onClickSignInButton() {
    this.router.navigate(['users/auth/signin']);
  }
}
