import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../users.service';
import { User } from 'src/app/shared/interfaces/user';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  public form: FormGroup;

  public error?: string = '';

  constructor(
    private router: Router,
    public usersService: UsersService,
    public appComponent: AppComponent
  ) {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  signin(form: any) {
    if (form.valid) {
      this.usersService.signin(form.value).subscribe(
        (res:any) => {
          this.error = '';
          this.usersService.setUserData(res['access_token']);
          return this.router.navigate(['']);
        },
        () => {
          this.error = 'Incorrect Username or Password';
        }
      );
    }
  }

  onClickSignUpButton() {
    this.router.navigate(['users/auth/signup']);
  }
}
