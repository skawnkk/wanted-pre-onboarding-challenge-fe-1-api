import todo from '../pages/api/todo';
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const useDelete = (onError = () => {}) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn:(id: string) => todo.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTodos'] });
    },
    onError,
  });

  return { mutate };
};
