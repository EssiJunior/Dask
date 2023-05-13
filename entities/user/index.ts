export type UserData = {
  uid: string;
  email: string;
  name: string;
  avatar: string;
  createdAt: Date;
  projects: any[];
}

export default class User {
  private _uid: string;
  private _email: string;
  private _name: string;
  private _avatar: string;
  private _createdAt: Date;
  private _projects: any[];

  constructor(userData: UserData) {
    this._uid = userData.uid;
    this._email = userData.email;
    this._name = userData.name;
    this._avatar = userData.avatar;
    this._createdAt = userData.createdAt;
    this._projects = userData.projects || [];
  }

  get uid(): string {
    return this._uid;
  }

  get email(): string {
    return this._email;
  }

  get name(): string {
    return this._name;
  }

  get avatar(): string {
    return this._avatar;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get projects(): any[] {
    return this._projects;
  }
}