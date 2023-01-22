import React from 'react';
import { useRouter } from 'next/router';
import { todo } from '../pages/api/todo';
import { useDelete } from '../react-query/todos/useDelete';
import { useGetAll } from '../react-query/todos/useGetAll';

function TodoList() {
  const router = useRouter();
  const list = useGetAll();
  const { mutate: deleteTodo } = useDelete();

  const handleDetailClick = (todo: todo) => {
    router.push(`/${todo.id}`);
  };
  const handleDeleteClick = (e:React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation()
    deleteTodo(id);

    if (id === router.query.id) {
      router.push('/');
    }
  };

  return (
    <div className="mx-5 flex-one overflow-y-scroll" style={{ height: `calc( 100vh - 320px )` }}>
      {list?.map((li, idx) => (
        <div
          key={li.id}
          tabIndex={idx+1}
          className={'flex bg-white items-center justify-between mb-3 p-2'}
          onClick={() => handleDetailClick(li)}
          onKeyPress={() => handleDetailClick(li)}
        >
          <div >{li.title}</div>
          <button onClick={(e) => handleDeleteClick(e, li.id)}>✖️</button>
        </div>
      ))}
    </div>
  );
}

export default TodoList;