import React, {ReactElement} from 'react';
import dynamic from "next/dynamic";
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {detailStateAtom, POST_STATE} from '../recoil/atoms/state';
import useGet from '../react-query/todos/useGet';
import Header from '../components/Header';
import {isLoginOnServer} from '../utils/auth';
import styles from '../styles/Home.module.css';
import {GetServerSidePropsContext} from "next";
import LoadingSpinner from "../src/components/loading/Spinner";
import ApiErrorBoundary from "../src/components/error/ApiErrorBoundary";
import ErrorFallback from "../src/components/error/ErrorFallback";
import {isAxiosError} from "axios";

const TodoCard = dynamic(()=>import('../components/TodoCard'),{ssr:false, loading:()=><LoadingSpinner/>});
const EditTodoForm = dynamic(()=>import('../components/EditTodoForm'),{ssr:false, loading:()=><LoadingSpinner/>});
const CreateTodoForm = dynamic(()=>import('../components/CreateTodoForm'),{ssr:false, loading:()=><LoadingSpinner/>});
const TodoList = dynamic(()=>import('../components/TodoList'),{ssr:false, loading:()=><LoadingSpinner/>});

export default function TodoDetail() {
  const router = useRouter();
  const state = useRecoilValue(detailStateAtom);
  const id = router.query.id as string;
  const todo = useGet({ id, onError: () => router.push('/') });

  return (
    <ApiErrorBoundary
      onError={({error})=>{
        if (isAxiosError(error)) {
          throw error;
        }
      }}
      fallbackRender={({ resetErrorBoundary }) => (
        <ErrorFallback onReset={resetErrorBoundary} message={'api'}/>
      )}>
        {todo.id && state === POST_STATE.READ && <TodoCard item={todo}/>}
        {todo.id && state === POST_STATE.EDIT  && <EditTodoForm todo={todo} />}
        <TodoList />
        {state === POST_STATE.READ && <CreateTodoForm />}
    </ApiErrorBoundary>
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

