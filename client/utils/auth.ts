import { emailValidate, passwordValidate } from './validate';

const isLogin = () => {
  if (typeof window !== 'undefined') {
    return Boolean(localStorage.getItem('token')) || false;
  }
  return false;
};

interface AuthInput {
  email: string;
  password: string;
}

const validateAuthInput = ({ email, password }: AuthInput) => {
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

export { isLogin, validateAuthInput };
