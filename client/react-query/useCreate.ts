import { useMutation, useQueryClient } from 'react-query';
import Todo, { CreateTodo } from '../pages/api/todo';

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

