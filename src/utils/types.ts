export enum Status {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface ITodoList {
  count: number;
  todoList: ITodo[];
}

export interface ITodo {
  id: string;
  content: string;
  isCheck: boolean;
  createdAt: string | Date;
  deadLine: string | Date;
  status: string;
}
