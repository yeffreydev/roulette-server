import { db } from "../../../config/db";
import { OkPacket } from "mysql2";
import { NumberRouletteI, NumberRouletteModel } from "../model";

const readAll = (): Promise<NumberRouletteModel[]> => {
  return new Promise((res, rej) => {
    db.query<NumberRouletteModel[]>(
      "SELECT * FROM number_roulette",
      (err, data) => {
        if (err) return rej(err);
        res(data);
      }
    );
  });
};
const readByRouletteId = (
  id: string | number
): Promise<NumberRouletteModel[]> => {
  return new Promise((res, rej) => {
    db.query<NumberRouletteModel[]>(
      "SELECT * FROM number_roulette WHERE rouletteId = ?",
      [id],
      (err, data) => {
        if (err) return rej(err);
        res(data);
      }
    );
  });
};
const readByUserId = (
  userId: number | string
): Promise<NumberRouletteModel[]> => {
  return new Promise((res, rej) => {
    db.query<NumberRouletteModel[]>(
      "SELECT * FROM number_roulette WHERE userId = ?",
      [userId],
      (err, data) => {
        if (err) return rej(err);
        res(data);
      }
    );
  });
};
const readBySessionId = (
  sessionId: number | string
): Promise<NumberRouletteModel[]> => {
  return new Promise((res, rej) => {
    db.query<NumberRouletteModel[]>(
      "SELECT * FROM number_roulette WHERE sessionId = ?",
      [sessionId],
      (err, data) => {
        if (err) return rej(err);
        res(data);
      }
    );
  });
};
const readById = (id: number | string): Promise<NumberRouletteModel> => {
  return new Promise((res, rej) => {
    db.query<NumberRouletteModel[]>(
      "SELECT * FROM number_roulette WHERE id = ?",
      [id],
      (err, nr) => {
        if (err) return rej(err);
        res(nr?.[0]);
      }
    );
  });
};
const create = (nRoulette: NumberRouletteI): Promise<NumberRouletteModel> => {
  return new Promise((res, rej) => {
    db.execute<OkPacket>(
      "INSERT INTO number_roulette (userId, rouletteId, sessionId, valueNumber) VALUES (?,? ?,?)",
      [
        nRoulette.userId,
        nRoulette.rouletteId,
        nRoulette.sessionId,
        nRoulette.valueNumber,
      ],
      (err, resPack) => {
        if (err) return rej(err);
        readById(resPack.insertId)
          .then((nr) => res(nr!))
          .catch(rej);
      }
    );
  });
};
const updateById = (
  nRoulette: NumberRouletteI
): Promise<NumberRouletteModel | undefined> => {
  return new Promise((res, rej) => {
    db.query<OkPacket>(
      "UPDATE number_roulette SET valueNumber = ? WHERE id = ?",
      [nRoulette.valueNumber, nRoulette.id],
      (err, resPack) => {
        if (err) return rej(err);
        readById(nRoulette.id!).then(res).catch(rej);
      }
    );
  });
};
const deleteById = (id: number | string): Promise<number> => {
  return new Promise((res, rej) => {
    db.query<OkPacket>(
      "DELETE FROM number_roulette WHERE id = ?",
      id,
      (err, resPack) => {
        if (err) return rej(err);
        res(resPack.affectedRows);
      }
    );
  });
};
const numberRouletteDb = {
  readAll,
  readByUserId,
  readByRouletteId,
  readBySessionId,
  readById,
  create,
  updateById,
  deleteById,
};

export default numberRouletteDb;
