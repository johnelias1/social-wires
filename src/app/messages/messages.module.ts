// IMPORTS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CreateMessageComponent } from './pages/create-message/create-message.component';
import { MessagesRoutingModule } from './messages-routing.module';
import { UsersModule } from '../users/users.module';

@NgModule({
  declarations: [
    CreateMessageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MessagesRoutingModule,
    UsersModule,
  ],
  providers: [
  ],
})
export class MessagesModule {}
