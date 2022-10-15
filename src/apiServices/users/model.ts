import { RowDataPacket } from "mysql2";

export interface UserModel extends RowDataPacket {
  id?: number;
  username: string;
  email: string;
  age: number;
  password: string;
}

export interface UserI {
  id?: number;
  username: string;
  email: string;
  age: number;
  password: string;
}
