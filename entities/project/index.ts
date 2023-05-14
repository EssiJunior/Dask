import User from "../user";

export type ProjectData = {
  id: string;
  name: string;
  description: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  color: string;
  members: User[];
  tasks?: any[];
}

export default class Project {
  private _id: string;
  private _name: string;
  private _description: string;
  private _avatar: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _color: string;
  private _members: User[];
  private _tasks: any[];

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

  get tasks(): any[] {
    return this._tasks;
  }
}