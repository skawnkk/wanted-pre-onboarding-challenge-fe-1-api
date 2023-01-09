import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import Todo from '../pages/api/todo';

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

  const { mutate: updateTodo } = useMutation(({ title, content }: UseUpdateParam) => Todo.updateTodo({ id, title, content }), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTodos'] });
      queryClient.invalidateQueries({ queryKey: ['getTodo', id] });
      onSuccess();
    },
  });

  return { updateTodo };
};

export default useUpdate;
