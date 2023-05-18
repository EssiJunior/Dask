import User from "../user";

export type TaskData = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: TaskStatus;
  projectId: string;
  workers: User[];
}

export enum TaskStatus {
  TODO = "to do",
  PENDING = "pending",
  DONE = "done",
}

export default class Task {
  private _id: string;
  private _title: string;
  private _description: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _status: TaskStatus;
  private _projectId: string;
  private _workers: User[];

  constructor(taskData: TaskData) {
    this._id = taskData.id;
    this._title = taskData.title;
    this._description = taskData.description;
    this._createdAt = taskData.createdAt;
    this._updatedAt = taskData.updatedAt;
    this._status = taskData.status;
    this._projectId = taskData.projectId;
    this._workers = taskData.workers;
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get status(): TaskStatus {
    return this._status;
  }

  get projectId(): string {
    return this._projectId;
  }

  get workers(): User[] {
    return this._workers;
  }

  addWorker(worker: User): void {
    this._workers.push(worker);
  }
}