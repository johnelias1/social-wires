import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AppComponent } from 'src/app/app.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessagesService } from '../../messages.service';
import { UsersService } from 'src/app/users/users.service';
import { Message } from '../../interfaces/message';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss'],
})
export class CreateMessageComponent implements OnInit {
  public form!: FormGroup;
  public myMessages: Message[] = [];

  constructor(
    public router: Router,
    private messagesService: MessagesService,
    public usersService: UsersService,
    public appComponent: AppComponent
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      text: new FormControl('', [
        Validators.required,
        Validators.maxLength(700),
        Validators.pattern(
          new RegExp('^([a-z0-9]+(/{1}[a-z0-9]+)*)+(?!([/]{2}))$')
        ),
      ]),
    });
  }

  create(form: FormGroup) {
    if (!form.valid) return;

    this.messagesService
      .createMessage(form.value)
      .subscribe((createdMessage: any) => {
        this.form.reset();
        const date = new Date(createdMessage.createdAt);
        createdMessage.createdAt = date.toDateString() as any;
        this.myMessages.push(createdMessage as Message);
      });
  }
}
