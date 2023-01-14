import {ReactElement} from 'react';
import {GetServerSidePropsContext} from "next";
import TodoList from '../components/TodoList';
import CreateTodoForm from '../components/CreateTodoForm';
import Header from '../components/Header';
import styles from '../styles/Home.module.css';
import {isLoginOnServer} from "../utils/auth";

function Home() {
  return (
    <>
      <TodoList />
      <CreateTodoForm />
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