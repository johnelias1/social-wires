import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Message } from 'src/app/messages/interfaces/message';
import { MessagesService } from 'src/app/messages/messages.service';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.scss'],
})
export class MessageCardComponent {
  constructor(
    public router: Router,
    public userService: UsersService,
    private messagesService: MessagesService
  ) {
    this.form = new FormGroup({
      text: new FormControl('', [
        Validators.required,
        Validators.maxLength(700),
        Validators.pattern(
          new RegExp('^([a-z0-9]+(/{1}[a-z0-9]+)*)+(?!([/]{2}))$')
        ),
      ]),
    });
  }

  form: FormGroup;
  @Input() message!: any;
  @Output() comment!: EventEmitter<any>;
  comments = new BehaviorSubject(false);

  add() {
    console.log('entro');
    this.comments.next(true);
  }

  create(form: FormGroup) {
    console.log(this.message);
    if (!form.valid) return;
    const body = {
      id: this.message.id,
      comment: this.form.get('text')?.value,
    };
    console.log(body);
    this.messagesService.createComment(body).subscribe(() => {
      this.messagesService.listMessages().subscribe();
    });
  }
}
