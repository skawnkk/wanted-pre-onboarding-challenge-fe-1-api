import Todo from '../pages/api/todo';
import {useMutation, useQueryClient} from "@tanstack/react-query";

interface UseUpdate {
  id: string;
  onSuccess: () => void;
}
interface UseUpdateParam {
  title: string;
  content: string;
}
const useUpdate = ({ id, onSuccess }: UseUpdate) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ title, content }: UseUpdateParam) => Todo.updateTodo({ id, title, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTodos'] });
      queryClient.invalidateQueries({ queryKey: ['getTodo', id] });
      onSuccess();
    },
  });

  return { mutate };
};

export default useUpdate;
