import { db } from "../../../config/db";
import { OkPacket } from "mysql2";
import { UserI, UserModel } from "../model";

class UserRepository {
  readAll(): Promise<UserModel[]> {
    return new Promise((resolve, reject) => {
      db.query<UserModel[]>("SELECT * FROM users", (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
  readById(id: number): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      db.query<UserModel[]>(
        "SELECT * FROM users WHERE id = ?",
        [id],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }
  readByUsernameOrEmail(username: string): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      db.query<UserModel[]>(
        "SELECT * FROM users WHERE username = ? or email = ?",
        [username, username],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }
  create(user: UserI): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      db.execute<OkPacket>(
        "INSERT INTO users (username, email, age, password) VALUES(?,?,?,?);",
        [user.username, user.email, user.age, user.password],
        (err, res) => {
          if (err) reject(err);
          else
            this.readById(res.insertId)
              .then((user) => resolve(user!))
              .catch(reject);
        }
      );
    });
  }
  update(user: UserI): Promise<UserModel | undefined> {
    return new Promise((resolve, reject) => {
      db.query<OkPacket>(
        "UPDATE users SET username = ? email = ? age = ? password = ? WHERE id = ?",
        [user.username, user.email, user.age, user.password, user.id],
        (err, res) => {
          if (err) reject(err);
          else this.readById(user.id!).then(resolve).catch(reject);
        }
      );
    });
  }
  remove(id: number | string): Promise<number> {
    return new Promise((resolve, reject) => {
      db.query<OkPacket>("DELETE FROM users WHERE id = ?", id, (err, res) => {
        if (err) reject(err);
        else resolve(res.affectedRows);
      });
    });
  }
}

export default UserRepository;
