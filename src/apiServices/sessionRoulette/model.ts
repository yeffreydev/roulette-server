import { RowDataPacket } from "mysql2";

export interface SessionRouletteModel extends RowDataPacket {
  id?: number;
  roulletteId: number;
  userId: number;
  name: string;
}

export interface SessionRouletteI {
  id?: number;
  rouletteId: number;
  userId: number;
  name: string;
}
