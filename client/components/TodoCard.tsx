import React, {useEffect} from 'react';
import dayjs from "dayjs";
import Button from "../atomic/Button";
import {useDelete} from "../react-query/todos/useDelete";
import {useRouter} from "next/router";
import {detailStateAtom, POST_STATE} from "../recoil/atoms/state";
import {todo} from "../pages/api/todo";
import {useSetRecoilState} from "recoil";

interface TodoCard {
  item: todo
}

function TodoCard({item:{id,updatedAt,title,content}}:TodoCard) {
  const router = useRouter()
  const setState = useSetRecoilState(detailStateAtom);

  const { mutate : deleteTodo } = useDelete(() => router.push('/'));
  const handleEditClick = () => setState(POST_STATE.EDIT);
  const handleDeleteClick = () => {
    deleteTodo(id);
    router.push('/');
  };

  useEffect(()=>{
    throw new Error('todoCards')
  },[])

  return (
    <div className="m-5">
      <div className={'flex flex-row-reverse'}>마지막 수정일: {dayjs(updatedAt).format('YYYY/MM/DD')}</div>

      <div className={'block font-bold w-full h-12 p-3 rounded-lg'}>{title}</div>
      <div className={'block w-full h-12 mt-3 p-3 rounded-lg'}>{content}</div>
      <div className="flex gap-2">
        <Button className={'btn-slate-600'} onClick={handleEditClick}>
          수정하기
        </Button>
        <Button className={'btn-default'} onClick={handleDeleteClick}>
          삭제하기
        </Button>
      </div>
    </div>
  );
}

export default TodoCard;