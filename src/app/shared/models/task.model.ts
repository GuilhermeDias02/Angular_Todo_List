export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignedTo?: string; 
  createdAt: string;   
  updatedAt: string; 
}

export interface User {
  username: string;
  role?: 'USER' | 'ADMIN';
}
