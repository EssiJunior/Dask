import * as SQLite from "expo-sqlite";
import { ResultSet } from "expo-sqlite";
import { db } from "..";
import Project from "../../../entities/project";
import User from "../../../entities/user";
import TasksRepository from "../tasks";
import { CreateProjectDto } from "./type";

export default class ProjectsRepository {
  private static db: SQLite.WebSQLDatabase = db;

  /**
   * Creates the projects table
   * @returns {Promise<boolean>}
   */
  static async init(): Promise<boolean> {
    try {
      return new Promise((resolve, reject) => {
        this.db.exec(
          [
            {
              sql: `CREATE TABLE IF NOT EXISTS projects (
                id TEXT PRIMARY KEY, 
                name TEXT NOT NULL,
                description TEXT,
                color TEXT,
                avatar TEXT,
                created_at INTEGER NOT NULL,
                updated_at INTEGER NOT NULL
              )`,
              args: [],
            },
          ],
          false,
          (_, results) => {
            if (results) {
              const data = results[0] as ResultSet;

              if (data && data.rows) {
                console.log("Projects table created");

                resolve(true);

                return;
              } else {
                console.log(
                  "An error occured while creating the project table"
                );

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
   * Drops the projects table
   * @returns Promise<boolean>
   */
  static async drop(): Promise<boolean> {
    try {
      return new Promise((resolve, reject) => {
        this.db.exec(
          [
            {
              sql: `DROP TABLE projects`,
              args: [],
            },
          ],
          false,
          (_, results) => {
            if (results) {
              const data = results[0] as ResultSet;

              if (data && data.rows) {
                console.log("Projects table dropped");

                resolve(true);

                return;
              } else {
                console.log(
                  "An error occured while deleting the projects table"
                );

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
   * Inserts a project into the projects table
   * @param {CreateProjectDto} payload
   */
  static async insert(payload: CreateProjectDto): Promise<boolean> {
    console.log({payload})

    try {
      return new Promise((resolve, reject) => {
        this.db.exec(
          [
            {
              sql: `INSERT INTO projects (id, name, description, color, avatar, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
              args: [
                payload.id,
                payload.name,
                payload.description,
                payload.color,
                payload.avatar,
                payload.createdAt,
                payload.updatedAt,
              ],
            },
          ],
          false,
          (_, results) => {
            console.log({results})
            if (results) {
              const data = results[0] as ResultSet;

              if (data && data.rowsAffected) {
                console.log("Project inserted");

                resolve(true);

                return;
              } else {
                console.log("An error occured");

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
   * Find all projects
   */
  static async findAll(): Promise<Project[]> {
    try {
      return new Promise((resolve, reject) => {
        this.db.exec(
          [
            {
              sql: `SELECT * FROM projects`,
              args: [],
            },
          ],
          false,
          async (_, results) => {
            if (results) {
              const data = results[0] as ResultSet;

              console.log(data);

              if (data && data.rows.length) {
                const projects: Project[] = [];
                
                for (let p of data.rows) {
                  // Load tasks
                  const tasks = await TasksRepository.findAllByProjectId(p.id);

                  const project = new Project({
                    id: p.id,
                    name: p.name,
                    description: p.description,
                    avatar: p.avatar,
                    color: p.color,
                    members: [],
                    tasks,
                    type: "personal",
                    createdAt: new Date(p.created_at),
                    updatedAt: new Date(p.updated_at),
                  });

                  projects.push(project);
                }

                resolve(projects);
              } else {
                resolve([]);
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

  /**
   * Delete project
   * @params {string} id
   */
  // static async delete(id: string): Promise<boolean> {
  //   try {
  //     this.db.exec([
  //       {
  //         sql: `DELETE`
  //       }
  //     ])
  //   } catch (error) {
  //     console.log(error);

  //     return new Promise((_, reject) => reject(false))
  //   }
  // }
}
