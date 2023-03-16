import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/messages/interfaces/message';
import { MessagesService } from 'src/app/messages/messages.service';
import { UsersService } from '../../../users/users.service';

type RequestParams = {
  createdBy?: string;
  search?: string;
  date?: string;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public messages: any = [];

  public isMyMessagesView: boolean = false;
  private date: string = '';
  private search: string = '';

  constructor(
    private router: Router,
    private usersService: UsersService,
    private messagesService: MessagesService
  ) {
    this.userData = this.usersService.userData;
  }

  userData: any;
  ngOnInit(): void {
    this.getMessagesList();
  }

  private getMessagesList() {
    this.isMyMessagesView = this.router.url.includes('myMessages');
    const params: RequestParams = {};

    if (this.date) {
      params.date = this.date;
      this.messagesService
        .getFilterMessages(params)
        .subscribe((dbMessages: any) => {
          dbMessages.map((element: any) => {
            this.messages.push({
              title: element.title,
              text: element.text,
              user: {
                createdAt: element.updatedAt,
              },
            });
          });
        });
      return;
    }

    if (this.search) {
      params.search = this.search;
      this.messagesService
        .getFilterMessages(params)
        .subscribe((dbMessages: any) => {
          dbMessages.map((element: any) => {
            this.messages.push({
              title: element.title,
              text: element.text,
              user: {
                createdAt: element.updatedAt,
              },
            });
          });
        });
      return;
    }

    if (this.isMyMessagesView) {
      params.createdBy = this.userData.id;
      this.messagesService.getAllMessagesMe().subscribe((dbMessages: any) => {
        dbMessages.map((element: any) => {
          this.messages.push({
            title: element.title,
            text: element.text,
            user: {
              createdAt: element.updatedAt,
            },
          });
        });
      });
      return;
    }

    if (!this.isMyMessagesView) {
      this.messagesService.listMessages().subscribe((dbMessages) => {
        this.messages = dbMessages;
      });
    }
  }

  public onChangeSearch(search: string) {
    this.search = search;
    this.getMessagesList();
  }

  public onChangeDate(date: string) {
    this.date = date;
    this.getMessagesList();
  }
}
