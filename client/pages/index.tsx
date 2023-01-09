import { isLogin } from '../utils/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import TodoList from '../components/TodoList';
import CreateTodoForm from '../components/CreateTodoForm';
import Title from '../components/Title';
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!isLogin()) {
      router.push('/auth');
      return;
    }
  }, []);

  return (
    <div className={styles.main}>
      <Title />
      <TodoList />
      <CreateTodoForm />
    </div>
  );
}
