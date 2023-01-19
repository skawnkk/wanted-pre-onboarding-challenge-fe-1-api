import Todo, { todo } from '../pages/api/todo';
import {useQuery} from "@tanstack/react-query";

export const useGetAll = () => {
  const { data = [] } = useQuery<todo[]>({
    queryKey:['getTodos'],
    queryFn:Todo.getTodos
  });
  return data;
};

