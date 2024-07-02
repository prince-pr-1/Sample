export interface Task {
  task: string;
  updatedDate: string;
  taskDate: any;
  status: string;
  important: boolean;
}

export interface User {
  name: string;
  email: string;
  password: string;
  tasks?: [];
  id?: string;
}
