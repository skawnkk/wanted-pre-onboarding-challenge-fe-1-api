import React from 'react';
import { useRouter } from 'next/router';
import { todo } from '../pages/api/todo';
import { useDelete } from '../react-query/useDelete';
import useGetAll from '../react-query/useGetAll';

function TodoList() {
  const router = useRouter();
  const list = useGetAll();
  const { deleteTodo } = useDelete({});
  const handleDetailClick = (todo: todo) => {
    router.push(`/${todo.id}`);
  };
  const handleDeleteClick = (id: string) => {
    deleteTodo(id);

    if (id === router.query.id) {
      console.log('id', id, router.query.id);
      router.push('/');
    }
  };

  return (
    <div className="mx-5 flex-one overflow-y-scroll" style={{ height: `calc( 100vh - 320px )` }}>
      {list.map((li) => (
        <div key={li.id} className={'flex bg-white items-center justify-between mb-3 p-2'}>
          <div onClick={() => handleDetailClick(li)}>{li.title}</div>
          <button onClick={() => handleDeleteClick(li.id)}>✖️</button>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
