import task from "../../components/projects/styles/task";
import Colors from "../../constants/Colors";
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
};

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

  set status(status: TaskStatus) {
    this._status = status;

    console.log("yooooooooo", status);
  }

  addWorker(worker: User): void {
    this._workers.push(worker);
  }

  getFormatedStatus() {
    let badgeWidth = 0;
    let badgeText = "";
    let badgeColor = Colors.light.grayNormal;
    let badgeTextColor = Colors.light.black;

    switch (this._status.toLowerCase()) {
      case TaskStatus.DONE:
        badgeText = "Done";
        badgeColor = Colors.light.green;
        badgeTextColor = Colors.dark.text;
        badgeWidth = 40;
        break;
      case TaskStatus.TODO:
        badgeText = "To do";
        badgeColor = Colors.light.grayNormal;
        badgeWidth = 40;
        break;
      case TaskStatus.PENDING:
        badgeText = "Pending";
        badgeColor = Colors.light.primary;
        badgeTextColor = Colors.dark.text;
        badgeWidth = 60;
        break;
    }

    return {
      badgeText,
      badgeColor,
      badgeTextColor,
      badgeWidth,
    };
  }
}
