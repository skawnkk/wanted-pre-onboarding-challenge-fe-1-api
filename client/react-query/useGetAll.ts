import { useQuery } from 'react-query';
import Todo, { todo } from '../pages/api/todo';

export const useGetAll = () => {
  const { data = [] } = useQuery<todo[]>(['getTodos'], Todo.getTodos);
  return data;
};

