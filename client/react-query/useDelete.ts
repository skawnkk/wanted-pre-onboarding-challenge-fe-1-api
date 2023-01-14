import { useMutation, useQueryClient } from 'react-query';
import todo from '../pages/api/todo';

export const useDelete = (onError = () => {}) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation((id: string) => todo.deleteTodo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTodos'] });
    },
    onError,
  });

  return { mutate };
};
