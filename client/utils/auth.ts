import { emailValidate, passwordValidate } from './validate';
import {getCookie} from "cookies-next";
export const TOKEN_KEY = 'todo_token'

export const getToken = () => {
  return getCookie(TOKEN_KEY)??'';
}

export const isLogin = () => {
  if(typeof window !== undefined) {
    return Boolean(getCookie(TOKEN_KEY));
  }
  return true;
}

export const isLoginOnServer = (ctx:any) => {
  return Boolean(getCookie(TOKEN_KEY, ctx));
};

interface AuthInput {
  email: string;
  password: string;
}

export const validateAuthInput = ({ email, password }: AuthInput) => {
  if (!email || !password) {
    return '아이디 또는 비밀번호를 입력해주세요';
  }
  if (!emailValidate(email)) {
    return '올바른 이메일 주소를 입력해주세요';
  }
  if (!passwordValidate(password)) {
    return '8자리 이상의 비밀번호입니다';
  }
  return '';
};
