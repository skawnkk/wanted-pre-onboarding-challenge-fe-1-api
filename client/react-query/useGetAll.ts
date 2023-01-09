import { useQuery } from 'react-query';
import Todo, { todo } from '../pages/api/todo';

const useGetAll = () => {
  const { data: list = [] } = useQuery<todo[]>(['getTodos'], Todo.getTodos);
  return list;
};

export default useGetAll;
