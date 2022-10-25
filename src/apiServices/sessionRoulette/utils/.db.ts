import { db } from "../../../config/db";
import { OkPacket } from "mysql2";
import { SessionRouletteI, SessionRouletteModel } from "../model";

const readAll = (): Promise<SessionRouletteModel[]> => {
  return new Promise((res, rej) => {
    db.query<SessionRouletteModel[]>(
      "SELECT * FROM session_roulette",
      (err, data) => {
        if (err) return rej(err);
        res(data);
      }
    );
  });
};
const readByRouletteId = (
  id: string | number
): Promise<SessionRouletteModel[]> => {
  return new Promise((res, rej) => {
    db.query<SessionRouletteModel[]>(
      "SELECT * FROM session_roulette WHERE rouletteId = ?",
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
): Promise<SessionRouletteModel[]> => {
  return new Promise((res, rej) => {
    db.query<SessionRouletteModel[]>(
      "SELECT * FROM session_roulette WHERE userId = ?",
      [userId],
      (err, data) => {
        if (err) return rej(err);
        res(data);
      }
    );
  });
};
const readById = (id: number | string): Promise<SessionRouletteModel> => {
  return new Promise((res, rej) => {
    db.query<SessionRouletteModel[]>(
      "SELECT * FROM session_roulette WHERE id = ?",
      [id],
      (err, sr) => {
        if (err) return rej(err);
        res(sr?.[0]);
      }
    );
  });
};
const create = (sRoulette: SessionRouletteI): Promise<SessionRouletteModel> => {
  return new Promise((res, rej) => {
    db.execute<OkPacket>(
      "INSERT INTO session_roulette (userId, rouletteId, name) VALUES (?, ?,?)",
      [sRoulette.userId, sRoulette.rouletteId, sRoulette.name],
      (err, resPack) => {
        if (err) return rej(err);
        readById(resPack.insertId)
          .then((sr) => res(sr!))
          .catch(rej);
      }
    );
  });
};
const updateById = (
  sRoulette: SessionRouletteI
): Promise<SessionRouletteModel | undefined> => {
  return new Promise((res, rej) => {
    db.query<OkPacket>(
      "UPDATE session_roulette SET name = ? WHERE id = ?",
      [sRoulette.name, sRoulette.id],
      (err, resPack) => {
        if (err) return rej(err);
        readById(sRoulette.id!).then(res).catch(rej);
      }
    );
  });
};
const deleteById = (id: number | string): Promise<number> => {
  return new Promise((res, rej) => {
    db.query<OkPacket>(
      "DELETE FROM session_roulette WHERE id = ?",
      id,
      (err, resPack) => {
        if (err) return rej(err);
        res(resPack.affectedRows);
      }
    );
  });
};
const sessionRouletteDb = {
  readAll,
  readByUserId,
  readByRouletteId,
  readById,
  create,
  updateById,
  deleteById,
};

export default sessionRouletteDb;
