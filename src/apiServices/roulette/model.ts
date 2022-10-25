import { RowDataPacket } from "mysql2";

export interface RouletteModel extends RowDataPacket {
  id?: number;
  userId: number;
  name: string;
}

export interface RouletteI {
  id?: number;
  userId: number;
  name: string;
}
