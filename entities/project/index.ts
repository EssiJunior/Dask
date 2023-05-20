import Task from "../task";
import User from "../user";
import { TaskStatus } from '../task/index';

export type ProjectData = {
  id: string;
  name: string;
  description: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  color: string;
  members: User[];
  owner?: User;
  tasks?: Task[];
  type: string;
};

export default class Project {
  private _id: string;
  private _name: string;
  private _description: string;
  private _avatar: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _color: string;
  private _members: User[];
  private _tasks: Task[];
  private _owner: User | undefined;
  private _type: string;

  constructor(projectData: ProjectData) {
    this._id = projectData.id;
    this._name = projectData.name;
    this._description = projectData.description;
    this._avatar = projectData.avatar;
    this._createdAt = projectData.createdAt;
    this._updatedAt = projectData.updatedAt;
    this._color = projectData.color;
    this._members = projectData.members;
    this._tasks = projectData.tasks || [];
    this._owner = projectData.owner || undefined;
    this._type = projectData.type;
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

  get avatar(): string {
    return this._avatar;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get color(): string {
    return this._color;
  }

  get members(): User[] {
    return this._members;
  }

  get tasks(): Task[] {
    return this._tasks;
  }

  get owner(): User | undefined {
    return this._owner;
  }

  get type(): string {
    return this._type;
  }

  getMembers(): User[] {
    const members = [...this.members];

    if (this._owner) members.push(this._owner);

    console.log({ members })

    return members;
  }

  addTask(task: Task) {
    this._tasks.push(task);
  }

  removeTask(taskId: string) {
    this._tasks = this._tasks.filter((task) => task.id !== taskId);
  }

  updateTask(task: Task) {
    const taskIndex = this._tasks.findIndex((t) => t.id === task.id);

    if (taskIndex !== -1) {
      this._tasks[taskIndex] = task;
    }
  }

  changeTaskStatus(taskId: string, status: TaskStatus) {
    const task = this._tasks.find((task) => task.id === taskId);

    if (task) {
      task.status = status;
    }
  }

  addMember(member: User) {
    this._members.push(member);
  }
}
