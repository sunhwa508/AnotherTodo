import { ITodo } from 'utils/types';

interface Props {
  todo: ITodo;
}
const TodoItem = ({ todo }: Props) => {
  return <div>{todo.content}</div>;
};

export { TodoItem };
