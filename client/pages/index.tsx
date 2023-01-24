import React, {ReactElement} from 'react';
import {GetServerSidePropsContext} from "next";
import dynamic from "next/dynamic";
import Header from '../components/Header';
import styles from '../styles/Home.module.css';
import {isLoginOnServer} from "../utils/auth";
import LoadingSpinner from '../src/components/loading/Spinner';
import CreateTodoForm from '../components/CreateTodoForm';

const TodoList = dynamic(()=>import('../components/TodoList'),{ssr:false, loading:()=><LoadingSpinner/>});

function Home() {
  return (
    <>
      <TodoList />
      <CreateTodoForm />
    </>
  );
}


export const getServerSideProps = async(ctx:GetServerSidePropsContext)=>{
  const {isLogin} = isLoginOnServer(ctx)
  if(!isLogin){
    return {
      redirect: {
        permanent: false,
        destination: '/auth',
      }
    }
  }

  return {
    props: {}
  }
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <div className={styles.main}>
      <Header />
      <>{page}</>
    </div>
  )
}

export default Home