import { User } from "src/app/shared/interfaces/user";

export interface Message {
  _id: string;
  title: string;
  message: object;
  createdBy: User;
  createdAt: string;
}
