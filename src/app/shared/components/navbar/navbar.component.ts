import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../users/users.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

import { MessagesService } from 'src/app/messages/messages.service';
import { Message } from 'src/app/messages/interfaces/message';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public showMenu: boolean = false;
  public showChat: boolean = false;

  public mostRecentMessages: Message[] = [];

  constructor(
    private router: Router,
    public appComponent: AppComponent,
    public usersService: UsersService,
    public messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.messagesService.getMostRecentMessages().subscribe((messages: any) => {
      this.mostRecentMessages = messages;
    });
  }

  logout() {
    return this.usersService.logout();
  }

  toggleShowMenu() {
    this.showMenu = !this.showMenu;
    this.showChat = false;
  }

  toggleShowChat() {
    this.showChat = !this.showChat;
    this.showMenu = false;
  }
}
