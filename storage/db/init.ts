import UsersRepository from './users';
import ProjectsRepository from "./projects";

export const initDBSchema = async () => {
  await UsersRepository.init();
  await ProjectsRepository.init();
}

export const destroyDBSchema = async () => {
  await ProjectsRepository.drop();
  await UsersRepository.drop();
}