import Todo, { todo, todoInitialValue } from '../../pages/api/todo';
import {useQuery} from "@tanstack/react-query";
import {todoKeys} from "./index";

interface UseGet {
  id: string;
  onError: () => void;
}
const useGet = ({ id, onError }: UseGet) => {
  const { data: todo = todoInitialValue } = useQuery<todo>(todoKeys.detail(id), () => Todo.getTodoById(id), {
    onError,
  });
  return todo;
};

export default useGet;
