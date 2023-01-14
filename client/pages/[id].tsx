import {ReactElement, useEffect} from 'react';
import { useRouter } from 'next/router';
import TodoList from '../components/TodoList';
import CreateTodoForm from '../components/CreateTodoForm';
import { useRecoilState } from 'recoil';
import { detailState } from '../recoil/atoms/state';
import { useDelete } from '../react-query/useDelete';
import useGet from '../react-query/useGet';
import EditTodoForm from '../components/EditTodoForm';
import Header from '../components/Header';
import Button from '../atomic/Button';
import {isLogin, isLoginOnServer} from '../utils/auth';
import dayjs from 'dayjs';
import styles from '../styles/Home.module.css';
import {GetServerSidePropsContext} from "next";

export default function TodoDetail() {
  const router = useRouter();
  const id = router.query.id as string;
  const todo = useGet({ id, onError: () => router.push('/') });

  const [state, setState] = useRecoilState(detailStateAtom);
  const { mutate : deleteTodo } = useDelete(() => router.push('/'));

  const handleEditClick = () => setState('edit');
  const handleDeleteClick = () => {
    deleteTodo(id);
    router.push('/');
  };

  useEffect(() => {
    if (!isLogin()) {
      router.push('/auth');
      return;
    }
  }, []);

  return (
    <>
      {todo.id && state === 'read' && (
        <div className="m-5">
          <div className={'flex flex-row-reverse'}>마지막 수정일: {dayjs(todo.updatedAt).format('YYYY/MM/DD')}</div>

          <div className={'block font-bold w-full h-12 p-3 rounded-lg'}>{todo.title}</div>
          <div className={'block w-full h-12 mt-3 p-3 rounded-lg'}>{todo.content}</div>
          <div className="flex gap-2">
            <Button className={'btn-slate-600'} onClick={handleEditClick}>
              수정하기
            </Button>
            <Button className={'btn-default'} onClick={handleDeleteClick}>
              삭제하기
            </Button>
          </div>
        </div>
      )}

      {todo.id && state === 'edit' && <EditTodoForm todo={todo} />}

      <TodoList />

      {state === 'read' && <CreateTodoForm />}
    </>
  );
}

export const getServerSideProps = async(ctx:GetServerSidePropsContext)=>{
  const isLogin = isLoginOnServer(ctx)

  if(!isLogin){
    return {
      redirect: {
        permanent: false,
        destination: '/auth',
      }
    }
  }

  return {
    props:{}
  }
}

TodoDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <div className={styles.main}>
      <Header />
      <>{page}</>
    </div>
  )
}

