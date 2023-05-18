import UsersRepository from './users';
import ProjectsRepository from "./projects";
import TasksRepository from './tasks';

export const initDBSchema = async () => {
  await UsersRepository.init();
  await ProjectsRepository.init();
  await TasksRepository.init();
}

export const destroyDBSchema = async () => {
  await ProjectsRepository.drop();
  await UsersRepository.drop();
  await TasksRepository.drop();
}