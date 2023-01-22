import {ReactElement} from 'react';
import {useRouter} from 'next/router';
import TodoList from '../components/TodoList';
import CreateTodoForm from '../components/CreateTodoForm';
import {useRecoilState} from 'recoil';
import {detailStateAtom, POST_STATE} from '../recoil/atoms/state';
import {useDelete} from '../react-query/todos/useDelete';
import useGet from '../react-query/todos/useGet';
import EditTodoForm from '../components/EditTodoForm';
import Header from '../components/Header';
import Button from '../atomic/Button';
import {isLoginOnServer} from '../utils/auth';
import dayjs from 'dayjs';
import styles from '../styles/Home.module.css';
import {GetServerSidePropsContext} from "next";

export default function TodoDetail() {
  const router = useRouter();
  const id = router.query.id as string;
  const todo = useGet({ id, onError: () => router.push('/') });

  const [state, setState] = useRecoilState(detailStateAtom);
  const { mutate : deleteTodo } = useDelete(() => router.push('/'));

  const handleEditClick = () => setState(POST_STATE.EDIT);
  const handleDeleteClick = () => {
    deleteTodo(id);
    router.push('/');
  };

  return (
    <>
      {todo.id && state === POST_STATE.READ && (
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

      {todo.id && state === POST_STATE.EDIT  && <EditTodoForm todo={todo} />}

      <TodoList />

      {state === POST_STATE.READ && <CreateTodoForm />}
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

