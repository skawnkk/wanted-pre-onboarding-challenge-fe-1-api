import { useMutation, useQueryClient } from 'react-query';
import Todo, { CreateTodo } from '../pages/api/todo';

interface UseCreate {
  onSuccess: () => void;
}
const useCreate = ({ onSuccess }: UseCreate) => {
  const queryClient = useQueryClient();
  const { mutate: createTodo } = useMutation(({ title, content }: CreateTodo) => Todo.createTodo({ title, content }), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTodos'] });
      onSuccess();
    },
  });
  return { createTodo };
};

export default useCreate;
