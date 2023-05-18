import * as SQLite from "expo-sqlite";
import { ResultSet } from "expo-sqlite";
import { db } from "..";
import Project from "../../../entities/project";
import Task from "../../../entities/task";
import User from "../../../entities/user";
import { CreateTaskDto } from "./type";

export default class TasksRepository {
  private static db: SQLite.WebSQLDatabase = db;

  /**
   * Creates the tasks table
   * @returns {Promise<boolean>}
   */
  static async init(): Promise<boolean> {
    try {
      return new Promise((resolve, reject) => {
        this.db.exec(
          [
            {
              sql: `CREATE TABLE IF NOT EXISTS tasks (
                id TEXT PRIMARY KEY, 
                title TEXT NOT NULL,
                description TEXT,
                status TEXT NOT NULL,
                project_id TEXT NOT NULL,
                created_at INTEGER NOT NULL,
                updated_at INTEGER NOT NULL,
                FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
              )`,
              args: [],
            },
          ],
          false,
          (_, results) => {
            if (results) {
              const data = results[0] as ResultSet;

              if (data && data.rows) {
                console.log("Tasks table created");

                resolve(true);

                return;
              } else {
                console.log("An error occured while creating the tasks table");

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

      return false;
    }
  }

  /**
   * Drop the tasks table
   * @returns {Promise<boolean>}
   */
  static async drop(): Promise<boolean> {
    try {
      return new Promise((resolve, reject) => {
        this.db.exec(
          [
            {
              sql: `DROP TABLE IF EXISTS tasks`,
              args: [],
            },
          ],
          false,
          (_, results) => {
            if (results) {
              const data = results[0] as ResultSet;

              if (data && data.rows) {
                console.log("Tasks table dropped");

                resolve(true);

                return;
              } else {
                console.log("An error occured while dropping the tasks table");

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

      return false;
    }
  }

  /**
   * Create a task
   * @param {CreateTaskDto} task
   * @returns {Promise<boolean>}
   */
  static async insert(task: CreateTaskDto): Promise<boolean> {
    try {
      return new Promise((resolve, reject) => {
        this.db.exec(
          [
            {
              sql: `
              INSERT INTO tasks (id, title, description, status, project_id, created_at, updated_at) 
              VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
              args: [
                task.id,
                task.title,
                task.description,
                task.status,
                task.projectId,
                task.createdAt,
                task.updatedAt,
              ],
            },
          ],
          false,
          (_, results) => {
            if (results) {
              const data = results[0] as ResultSet;

              if (data && data.rowsAffected) {
                console.log("Task inserted");

                resolve(true);

                return;
              } else {
                console.log("An error occured while inserting the task");

                reject(false);

                return;
              }
            }
          }
        );
      });
    } catch (error) {
      console.log(error);

      return false;
    }
  }

  /**
   * Get all tasks
   * @params {string} projectId
   * @returns {Promise<Task[]>}
   */
  static async findAll(projectId: string): Promise<Task[]> {
    try {
      return new Promise((resolve, reject) => {
        this.db.exec(
          [
            {
              sql: `
              SELECT * FROM tasks
              WHERE project_id = ?
            `,
              args: [projectId],
            },
          ],
          false,
          (_, results) => {
            if (results) {
              const data = results[0] as ResultSet;

              if (data && data.rows) {
                const tasks: Task[] = [];

                for (let i = 0; i < data.rows.length; i++) {
                  const task = data.rows[i];

                  tasks.push(
                    new Task({
                      id: task.id,
                      title: task.title,
                      description: task.description,
                      projectId: task.project_id,
                      status: task.status,
                      createdAt: new Date(task.created_at),
                      updatedAt: new Date(task.updated_at),
                      workers: [],
                    })
                  );
                }

                resolve(tasks);

                return;
              } else {
                console.log("An error occured while getting the tasks");

                reject([]);

                return;
              }
            }
          }
        );
      });
    } catch (error) {
      console.log(error);

      return new Promise((_, reject) => reject([]));
    }
  }

  /**
   * Change the status of a task
   * @param {string} taskId
   * @param {string} status
   * @returns {Promise<boolean>}
   */
  static async changeStatus(taskId: string, status: string): Promise<boolean> {
    try {

    } catch (error) {
      console.log(error);
      
      return new Promise((_, reject) => reject(false));
    }
  }
}
