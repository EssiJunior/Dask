import * as SQLite from "expo-sqlite";
import { ResultSet } from "expo-sqlite";
import { db } from "..";
import User from "../../../entities/user";
import { CreateUserDto } from "./type";

export default class UsersRepository {
  private static db: SQLite.WebSQLDatabase = db;

  /**
   * Creates the users table
   * @returns Promise<boolean>
   */
  static async init(): Promise<boolean> {
    try {
      return new Promise((resolve, reject) => {
        this.db.exec(
          [
            {
              sql: `CREATE TABLE IF NOT EXISTS users (
                uid TEXT PRIMARY KEY, 
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                color TEXT NOT NULL,
                avatar TEXT,
                created_at INTEGER NOT NULL
              )`,
              args: [],
            },
          ],
          false,
          (_, results) => {
            if (results) {
              const data = results[0] as ResultSet;

              console.log(data);

              if (data && data.rows) {
                console.log("Users table created");

                resolve(true);

                return;
              } else {
                console.log(" while creating users table");

                reject(false);

                return;
              }
            }

            reject(false);
          }
        );
      });
    } catch (error) {
      console.log(error);

      return new Promise((_, reject) => reject(false));
    }
  }

  /**
   * Drops the users table
   * @returns Promise<boolean>
   */
  static async drop(): Promise<boolean> {
    try {
      return new Promise((resolve, reject) => {
        this.db.exec(
          [
            {
              sql: `DROP TABLE users`,
              args: [],
            },
          ],
          false,
          (_, results) => {
            if (results) {
              const data = results[0] as ResultSet;

              if (data && data.rows) {
                console.log("Users table dropped");

                resolve(true);

                return;
              } else {
                console.log("An error occured while dropping users table");

                reject(false);

                return;
              }
            }

            reject(false);
          }
        );
      });
    } catch (error) {
      console.log(error);

      return new Promise((_, reject) => reject(false));
    }
  }

  /**
   * Inserts a user into the users table
   * @param payload CreateUserData
   */
  static async insert(payload: CreateUserDto): Promise<boolean> {
    try {
      const user = await UsersRepository.findByUid(payload.uid);

      if (!user) {
        return new Promise((resolve, reject) => {
          this.db.exec(
            [
              {
                sql: `INSERT INTO users (uid, name, email, color, avatar, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
                args: [
                  payload.uid,
                  payload.name,
                  payload.email,
                  payload.color,
                  payload.avatar,
                  payload.createdAt,
                ],
              },
            ],
            false,
            (_, results) => {
              if (results) {
                const data = results[0] as ResultSet;

                console.log({ data });

                if (data && data.rowsAffected) {
                  console.log("User inserted");

                  resolve(true);

                  return;
                } else {
                  console.log("An error occured while inserting user");

                  reject(false);

                  return;
                }
              }

              reject(false);
            }
          );
        });
      }

      return new Promise((resolve) => resolve(true));
    } catch (error) {
      console.log(error);

      return new Promise((_, reject) => reject(false));
    }
  }

  /**
   * Finds a user by their uid
   * @param uid string
   * @returns Promise<User | null>
   */
  static async findByUid(uid: string): Promise<User | null> {
    try {
      return new Promise((resolve, reject) => {
        this.db.exec(
          [
            {
              sql: `SELECT * FROM users WHERE uid = ?`,
              args: [uid],
            },
          ],
          false,
          async (_, results) => {
            if (results) {
              const data = results[0] as ResultSet;

              if (data && data.rows.length) {
                const userData = data.rows[0];

                const user = new User({
                  uid,
                  name: userData.name,
                  email: userData.email,
                  color: userData.color,
                  avatar: userData.avatar,
                  createdAt: new Date(userData.created_at),
                });

                console.log("User retrieved succesfully");

                resolve(user);
              } else {
                console.log("User not found");

                resolve(null);
              }
            }

            reject(null);
          }
        );
      });
    } catch (error) {
      console.log(error);

      return new Promise((_, reject) => reject(null));
    }
  }
}
