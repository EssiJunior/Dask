import User from "../../entities/user";

export type CreateProjectDto = {
  owner: User;
  name: string;
  description: string;
}

export type UpdateProjectDto = {
  name: string;
  description: string;
  avatar: string;
}