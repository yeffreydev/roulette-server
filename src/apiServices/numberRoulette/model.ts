import { RowDataPacket } from "mysql2";

export interface NumberRouletteModel extends RowDataPacket {
  id?: number;
  roulletteId: number;
  userId: number;
  sessionId: number;
  valueNumber: string;
}

export interface NumberRouletteI {
  id?: number;
  rouletteId: number;
  userId: number;
  sessionId: number;
  valueNumber: number;
}
