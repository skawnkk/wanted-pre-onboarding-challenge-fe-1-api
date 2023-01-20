import Todo, { todo } from '../pages/api/todo';
import {useQuery} from "@tanstack/react-query";
import {todoKeys} from "./index";

export const useGetAll = () => {
  const { data = [] } = useQuery<todo[]>({
    queryKey:todoKeys.all,
    queryFn:Todo.getTodos
  });
  return data;
};

