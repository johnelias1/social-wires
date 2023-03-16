import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/messages/interfaces/message';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.scss'],
})
export class MessageCardComponent {
  constructor(public router: Router) {}

  @Input() message!: any;
}
