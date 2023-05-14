import User from "../user";

export type TaskData = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  projectId: string;
  workers: User[];
}

export default class Task {
  private _id: string;
  private _name: string;
  private _description: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _status: string;
  private _projectId: string;
  private _workers: User[];

  constructor(taskData: TaskData) {
    this._id = taskData.id;
    this._name = taskData.name;
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

  get name(): string {
    return this._name;
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

  get status(): string {
    return this._status;
  }

  get projectId(): string {
    return this._projectId;
  }

  get workers(): User[] {
    return this._workers;
  }
}