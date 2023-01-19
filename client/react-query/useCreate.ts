import Todo, { CreateTodo } from '../pages/api/todo';
import {useMutation, useQueryClient} from "@tanstack/react-query";

interface UseCreate {
  onSuccess: () => void;
}

export const useCreate = ({ onSuccess }: UseCreate) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(({ title, content }: CreateTodo) => Todo.createTodo({ title, content }), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTodos'] });
      onSuccess();
    },
  });
  return { mutate };
};

