import { User } from 'src/app/shared/interfaces/user';

export interface Message {
  id: string;
  title: string;
  text: object;
  createdBy: User;
  createdAt: string;
}

