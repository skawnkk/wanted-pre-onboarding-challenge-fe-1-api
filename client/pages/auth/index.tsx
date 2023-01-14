import React, {ReactElement, useState} from 'react';
import { useRouter } from 'next/router';
import { useInput } from '../../hooks/useInput';
import {isLoginOnServer, TOKEN_KEY, validateAuthInput} from '../../utils/auth';
import Auth from '../api/auth';
import { AxiosResponse } from 'axios';
import {setCookie} from "cookies-next";
import Header from "../../components/Header";
import {GetServerSidePropsContext} from "next";

function Login() {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [signupMessage, setSignupMessage] = useState('');

  const { value: loginEmail, onChange: onChangeLoginEmail } = useInput();
  const { value: loginPassword, onChange: onChangeLoginPassword } = useInput();

  const { value: signupEmail, onChange: onChangeSignupEmail } = useInput();
  const { value: signupPassword, onChange: onChangeSignupPassword } = useInput();

  const onAfterAuth = (res: AxiosResponse) => {
    const { token } = res.data;
    setCookie(TOKEN_KEY, token)
    router.push('/');
  };

  const onError = (errorInfo: string) => {
    setLoginMessage(errorInfo);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginMessage('');
    const message = validateAuthInput({ email: loginEmail, password: loginPassword });
    if (message) setLoginMessage(message);

    Auth.login({ email: loginEmail, password: loginPassword }, onAfterAuth, onError);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupMessage('');
    const message = validateAuthInput({ email: signupEmail, password: signupPassword });
    if (message) {
      setSignupMessage(message);
      return;
    }
    Auth.signup({ email: signupEmail, password: signupPassword }, onAfterAuth, onError);
  };

  const handleSignupClick = () => setIsSignup(true);

  return (
    <div className={'p-5'}>
      <section>
        <div className={'mb-1'}>Login</div>
        <form onSubmit={handleLogin}>
          <input
            className="block w-full h-12 px-3 rounded-lg"
            value={loginEmail}
            onChange={onChangeLoginEmail}
            placeholder="이메일 주소"
          />
          <input
            className="block w-full mt-3 p-3 rounded-lg"
            type="password"
            value={loginPassword}
            onChange={onChangeLoginPassword}
            placeholder="비밀번호"
          />
          <button className="btn-default" type="submit">
            Login
          </button>
          <p>{loginMessage}</p>
        </form>
      </section>

      <div className="my-3 border-t-4 border-indigo-600"/>

      <section>
        <div className={'mb-1'} onClick={handleSignupClick}>
          Signup click!
        </div>
        {isSignup && (
          <form onSubmit={handleSignup}>
            <input
              className="block w-full h-12 px-3 rounded-lg"
              value={signupEmail}
              onChange={onChangeSignupEmail}
              placeholder="이메일 주소"
            />
            <input
              className="block w-full mt-3 p-3 rounded-lg"
              type="password"
              value={signupPassword}
              onChange={onChangeSignupPassword}
              placeholder="비밀번호"
            />
            <button className="btn-default" type="submit">
              Signup
            </button>
            <p>{signupMessage}</p>
          </form>
        )}
      </section>
    </div>
  );
}

export default Login;

export const getServerSideProps = async(ctx: GetServerSidePropsContext) =>{
 const isLogin = isLoginOnServer(ctx)

  if(isLogin){
   return {
     redirect:{
       permanent: false,
       destination: '/'
     }
   }
 }

 return {
   props: {}
 }
}

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <div>
      <Header />
      <>{page}</>
    </div>
  )
}
