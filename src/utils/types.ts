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
  id?: string;
  content: string;
  isCheck: boolean;
  created_at: Date;
  deadLine: Date;
  status: string;
}
