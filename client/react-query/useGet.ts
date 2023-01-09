import { useQuery } from 'react-query';
import Todo, { todo, todoInitialValue } from '../pages/api/todo';

interface UseGet {
  id: string;
  onError: () => void;
}
const useGet = ({ id, onError }: UseGet) => {
  const { data: todo = todoInitialValue } = useQuery<todo>(['getTodo', id], () => Todo.getTodoById(id), {
    onError,
  });
  return todo;
};

export default useGet;
