import { useMutation, useQueryClient } from 'react-query';
import todo from '../pages/api/todo';

interface UseDelete {
  onError?: () => void;
}
export const useDelete = ({ onError = () => {} }: UseDelete) => {
  const queryClient = useQueryClient();
  const { mutate: deleteTodo } = useMutation((id: string) => todo.deleteTodo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTodos'] });
    },
    onError,
  });

  return { deleteTodo };
};
