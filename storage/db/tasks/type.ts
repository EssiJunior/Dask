export type CreateTaskDto = {
  id: string;
  title: string;
  description: string;
  projectId: string;
  status: string;
  createdAt: number;
  updatedAt: number;
}