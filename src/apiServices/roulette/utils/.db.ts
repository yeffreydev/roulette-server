import { db } from "../../../config/db";
import { OkPacket } from "mysql2";
import { RouletteI, RouletteModel } from "../model";

const readAll = (): Promise<RouletteModel[]> => {
  return new Promise((res, rej) => {
    db.query<RouletteModel[]>("SELECT * FROM roulette", (err, data) => {
      if (err) return rej(err);
      res(data);
    });
  });
};
const readByUserId = (userId: number | string): Promise<RouletteModel[]> => {
  return new Promise((res, rej) => {
    db.query<RouletteModel[]>(
      "SELECT * FROM roulette WHERE userId = ?",
      [userId],
      (err, data) => {
        if (err) return rej(err);
        res(data);
      }
    );
  });
};
const readById = (id: number | string): Promise<RouletteModel> => {
  return new Promise((res, rej) => {
    db.query<RouletteModel[]>(
      "SELECT * FROM roulette WHERE id = ?",
      [id],
      (err, roulette) => {
        if (err) return rej(err);
        res(roulette?.[0]);
      }
    );
  });
};
const create = (roulette: RouletteI): Promise<RouletteModel> => {
  return new Promise((res, rej) => {
    db.execute<OkPacket>(
      "INSERT INTO roulette (userId, name) VALUES (?, ?)",
      [roulette.userId, roulette.name],
      (err, resPack) => {
        if (err) return rej(err);
        readById(resPack.insertId)
          .then((roulette) => res(roulette!))
          .catch(rej);
      }
    );
  });
};
const updateById = (
  roulette: RouletteI
): Promise<RouletteModel | undefined> => {
  return new Promise((res, rej) => {
    db.query<OkPacket>(
      "UPDATE roulette SET name = ? WHERE id = ?",
      [roulette.name, roulette.id],
      (err, resPack) => {
        if (err) return rej(err);
        readById(roulette.id!).then(res).catch(rej);
      }
    );
  });
};
const deleteById = (id: number | string): Promise<number> => {
  return new Promise((res, rej) => {
    db.query<OkPacket>(
      "DELETE FROM roulette WHERE id = ?",
      id,
      (err, resPack) => {
        if (err) return rej(err);
        res(resPack.affectedRows);
      }
    );
  });
};
const rouletteDb = {
  readAll,
  readByUserId,
  readById,
  create,
  updateById,
  deleteById,
};

export default rouletteDb;
