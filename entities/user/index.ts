export type UserData = {
  uid: string;
  email: string;
  name: string;
  avatar: string;
  createdAt: Date;
}

export default class User {
  private _uid: string;
  private _email: string;
  private _name: string;
  private _avatar: string;
  private _createdAt: Date;

  constructor(userData: UserData) {
    this._uid = userData.uid;
    this._email = userData.email;
    this._name = userData.name;
    this._avatar = userData.avatar;
    this._createdAt = userData.createdAt;
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
}